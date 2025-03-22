from abc import ABC, abstractmethod
from typing import BinaryIO, Union

class StorageProvider(ABC):
    """Base class for storage providers"""
    
    @abstractmethod
    async def upload_file(
        self, 
        bucket_name: str,
        file_data: Union[bytes, BinaryIO],
        file_name: str
    ) -> str:
        """Upload a file and return its CID"""
        pass

    @abstractmethod
    async def list_files(self, bucket_name: str) -> list[str]:
        """List all files in a bucket"""
        pass

    @abstractmethod 
    async def download_file(self, bucket_name: str, file_name: str, destination: str) -> str:
        pass