from abc import ABC, abstractmethod
from typing import BinaryIO

class StorageProvider(ABC):
    @abstractmethod
    async def upload_file(self, bucket_name: str, file_data: BinaryIO, file_name: str) -> str:
        pass

    @abstractmethod
    async def list_files(self, bucket_name: str) -> list[str]:
        pass