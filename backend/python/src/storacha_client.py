import json
import aiohttp
import asyncio
from typing import Any, Dict, List, Optional, Union, Tuple
from pathlib import Path
import logging
from web3.storage import Web3Storage
from pydantic import BaseModel
import os
from datetime import datetime
import time
from asyncio import Semaphore
from aiohttp import ClientTimeout
from tenacity import retry, stop_after_attempt, wait_exponential

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class StorachaError(Exception):
    """Base exception for Storacha client errors"""
    pass

class RateLimitError(StorachaError):
    """Exception raised when rate limit is hit"""
    pass

class BatchProcessingError(StorachaError):
    """Exception raised when batch processing fails"""
    pass

class StorachaClient:
    def __init__(
        self,
        api_token: Optional[str] = None,
        max_concurrent_requests: int = 10,
        rate_limit_per_second: int = 5,
        timeout: int = 30,
        retry_attempts: int = 3
    ):
        """
        Initialize the Storacha client with rate limiting and concurrency controls
        
        Args:
            api_token (Optional[str]): Web3.Storage API token. If None, reads from WEB3_STORAGE_TOKEN env var
            max_concurrent_requests (int): Maximum number of concurrent requests
            rate_limit_per_second (int): Maximum requests per second
            timeout (int): Request timeout in seconds
            retry_attempts (int): Number of retry attempts for failed requests
        """
        self.api_token = api_token or os.getenv('WEB3_STORAGE_TOKEN')
        if not self.api_token:
            raise StorachaError("API token not provided and WEB3_STORAGE_TOKEN not set")
            
        self.client = Web3Storage(self.api_token)
        self.gateway_base = "https://{cid}.ipfs.w3s.link"
        self.semaphore = Semaphore(max_concurrent_requests)
        self.rate_limit = rate_limit_per_second
        self.timeout = ClientTimeout(total=timeout)
        self.retry_attempts = retry_attempts
        self.last_request_time = 0
        self._request_count = 0
        self._window_start = time.time()

    async def _rate_limit(self):
        """Implement rate limiting"""
        current_time = time.time()
        if current_time - self._window_start >= 1.0:
            self._request_count = 0
            self._window_start = current_time
            
        if self._request_count >= self.rate_limit:
            wait_time = 1.0 - (current_time - self._window_start)
            if wait_time > 0:
                await asyncio.sleep(wait_time)
                self._request_count = 0
                self._window_start = time.time()
        
        self._request_count += 1

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=4, max=10),
        reraise=True
    )
    async def _make_request(self, cid: str) -> bytes:
        """Make a single request with retry logic"""
        await self._rate_limit()
        async with self.semaphore:
            try:
                gateway_url = self.gateway_base.format(cid=cid)
                async with aiohttp.ClientSession(timeout=self.timeout) as session:
                    async with session.get(gateway_url) as response:
                        if response.status == 429:
                            raise RateLimitError("Rate limit exceeded")
                        if response.status != 200:
                            raise StorachaError(f"Failed to retrieve file: {response.status}")
                        return await response.read()
            except Exception as e:
                logger.error(f"Error retrieving file with CID {cid}: {str(e)}")
                raise

    async def retrieve_file(
        self,
        cid: str,
        save_path: Optional[Path] = None
    ) -> Union[bytes, Path]:
        """
        Retrieve a file from Storacha using its CID
        
        Args:
            cid (str): Content Identifier of the file
            save_path (Optional[Path]): If provided, save the file to this path
            
        Returns:
            Union[bytes, Path]: The file content or the path where it was saved
            
        Raises:
            StorachaError: If retrieval fails
        """
        try:
            content = await self._make_request(cid)
            
            if save_path:
                save_path.parent.mkdir(parents=True, exist_ok=True)
                with open(save_path, 'wb') as f:
                    f.write(content)
                return save_path
            return content
        except Exception as e:
            logger.error(f"Error retrieving file with CID {cid}: {str(e)}")
            raise StorachaError(f"Failed to retrieve file: {str(e)}")

    async def retrieve_json(self, cid: str) -> Dict[str, Any]:
        """
        Retrieve and parse JSON data from Storacha
        
        Args:
            cid (str): Content Identifier of the JSON file
            
        Returns:
            Dict[str, Any]: The parsed JSON data
            
        Raises:
            StorachaError: If retrieval or parsing fails
        """
        try:
            content = await self._make_request(cid)
            return json.loads(content)
        except json.JSONDecodeError as e:
            logger.error(f"Error parsing JSON from CID {cid}: {str(e)}")
            raise StorachaError(f"Failed to parse JSON data: {str(e)}")

    async def retrieve_batch(
        self,
        cids: List[str],
        output_dir: Optional[Path] = None,
        return_results: bool = True
    ) -> Dict[str, Union[bytes, Path, Exception]]:
        """
        Retrieve multiple files concurrently
        
        Args:
            cids (List[str]): List of CIDs to retrieve
            output_dir (Optional[Path]): If provided, save files to this directory
            return_results (bool): Whether to return the results or just save files
            
        Returns:
            Dict[str, Union[bytes, Path, Exception]]: Dictionary mapping CIDs to their results or errors
            
        Raises:
            BatchProcessingError: If batch processing fails
        """
        results = {}
        tasks = []
        
        for cid in cids:
            if output_dir:
                save_path = output_dir / f"{cid}"
            else:
                save_path = None
                
            task = asyncio.create_task(
                self.retrieve_file(cid, save_path)
            )
            tasks.append((cid, task))
        
        for cid, task in tasks:
            try:
                result = await task
                if return_results:
                    results[cid] = result
            except Exception as e:
                logger.error(f"Error processing CID {cid}: {str(e)}")
                results[cid] = e
                
        return results

    async def upload_file(self, file_path: Path) -> str:
        """
        Upload a file to Storacha
        
        Args:
            file_path (Path): Path to the file to upload
            
        Returns:
            str: The CID of the uploaded file
            
        Raises:
            StorachaError: If upload fails
        """
        try:
            if not file_path.exists():
                raise StorachaError(f"File not found: {file_path}")
            
            with open(file_path, 'rb') as f:
                cid = self.client.put(file_path.name, f)
            return cid
        except Exception as e:
            logger.error(f"Error uploading file {file_path}: {str(e)}")
            raise StorachaError(f"Failed to upload file: {str(e)}")

    async def upload_json(self, data: Dict[str, Any], filename: str = "data.json") -> str:
        """
        Upload JSON data to Storacha
        
        Args:
            data (Dict[str, Any]): The JSON data to upload
            filename (str): Name to give the file in storage
            
        Returns:
            str: The CID of the uploaded file
            
        Raises:
            StorachaError: If upload fails
        """
        try:
            json_str = json.dumps(data)
            cid = self.client.put(filename, json_str.encode())
            return cid
        except Exception as e:
            logger.error(f"Error uploading JSON data: {str(e)}")
            raise StorachaError(f"Failed to upload JSON data: {str(e)}")

    def get_gateway_url(self, cid: str) -> str:
        """
        Get the IPFS HTTP gateway URL for a CID
        
        Args:
            cid (str): Content Identifier
            
        Returns:
            str: The gateway URL
        """
        return self.gateway_base.format(cid=cid)

# Initialize with custom settings
client = StorachaClient(
    api_token="your-token",  # or set WEB3_STORAGE_TOKEN env var
    max_concurrent_requests=15,
    rate_limit_per_second=10,
    timeout=60,
    retry_attempts=3
)

# Single file retrieval
content = await client.retrieve_file("your-cid")

# Save file to disk
saved_path = await client.retrieve_file("your-cid", save_path=Path("output/image.jpg"))

# Batch retrieval
cids = ["cid1", "cid2", "cid3"]
results = await client.retrieve_batch(
    cids,
    output_dir=Path("output/images"),
    return_results=True
)

# Handle batch results
for cid, result in results.items():
    if isinstance(result, Exception):
        print(f"Error processing {cid}: {result}")
    else:
        print(f"Successfully processed {cid}") 