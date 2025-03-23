from .base import StorageProvider
import httpx
from typing import BinaryIO

class AkaveStorageService(StorageProvider):
    def __init__(self, private_key, node_address: str, default_bucket: str):
        # Method 3: Format key in service class
        if isinstance(private_key, str):
            if not private_key.startswith('0x'):
                private_key = f'0x{private_key}'
            if not all(c in '0123456789abcdefABCDEF' for c in private_key[2:]):
                raise ValueError('Private key must be a hex string')
        self.private_key = private_key
        self.node_address = node_address
        self.default_bucket = default_bucket
        self.akave_url = "http://akavelink:3000"  # Docker service name

    async def upload_file(self, bucket_name: str, file_data: BinaryIO, file_name: str) -> dict:
        async with httpx.AsyncClient() as client:
            files = {"file": (file_name, file_data)}
            headers = {"Authorization": f"Bearer {self.private_key}"}
            
            response = await client.post(
                f"{self.akave_url}/api/v1/upload",
                files=files,
                headers=headers
            )
            result = response.json()
            
            return {
                "success": True,
                "data": {
                    "Name": file_name,
                    "Size": len(file_data.read()),
                    "cid": result["cid"],
                    "url": f"https://akave.ai/ipfs/{result['cid']}"
                }
            }

    async def download_file(self, bucket_name: str, file_name: str, destination: str) -> str:
        async with httpx.AsyncClient() as client:
            headers = {"Authorization": f"Bearer {self.private_key}"}
            response = await client.get(
                f"{self.akave_url}/api/v1/download/{file_name}",
                headers=headers
            )
            with open(destination, 'wb') as f:
                f.write(response.content)
            return destination

    async def list_files(self, bucket_name: str) -> str:
        async with httpx.AsyncClient() as client:
            headers = {"Authorization": f"Bearer {self.private_key}"}
            response = await client.get(
                f"{self.akave_url}/api/v1/files",
                headers=headers
            )
            return response.json()