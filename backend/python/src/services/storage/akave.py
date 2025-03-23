from .base import StorageProvider
import os
import subprocess
from typing import Union, BinaryIO
from pathlib import Path
from tempfile import NamedTemporaryFile
from io import BytesIO
from .akave_sdk import AkaveSDK, AkaveConfig, AkaveError
from ...core.config import settings

class AkaveStorageService(StorageProvider):
    def __init__(self):
        self.config = AkaveConfig(
            host=f"http://localhost:4000",  # Docker container port
        )
        self.sdk = AkaveSDK(self.config)
    
    async def upload_file(
        self,
        bucket_name: str,
        file_data: Union[bytes, BinaryIO],
        file_name: str
    ) -> str:
        """Upload file and return CID"""
        try:
            async with self.sdk as client:
                result = await client.upload_file(
                    bucket_name=bucket_name,
                    file_data=file_data,
                    file_name=file_name
                )
                return result['cid']
        except AkaveError as e:
            raise Exception(f"Akave upload failed: {e}")

    async def list_files(self, bucket_name: str) -> list[str]:
        """List files in bucket"""
        try:
            async with self.sdk as client:
                result = await client.list_files(bucket_name)
                return result['files']
        except AkaveError as e:
            raise Exception(f"Akave list failed: {e}")

    async def download_file(self, bucket_name, file_name, destination):
        return await super().download_file(bucket_name, file_name, destination)

    # def __init__(self, PrivateKey: str, NodeAddress: str, DefaultBucket: str):
    #     # set private key
    #     self.private_key = PrivateKey
    #     # Set node address
    #     self.node_address = NodeAddress 
    #     # Set default bucket
    #     self.default_bucket = DefaultBucket
    #     # Update port to match Docker container
    #     self.akave_port = 4000
    #     self._ensure_bucket_exists()

    # def _load_private_key(self, key_path: str) -> str:
    #     path = os.path.expanduser(key_path)
    #     with open(path, 'r') as f:
    #         return f.read().strip()

    # def _run_command(self, command: str) -> tuple[str, str]:
    #     print(f"Executing command: {command}")
    #     process = subprocess.Popen(
    #         command,
    #         shell=True,
    #         stdout=subprocess.PIPE,
    #         stderr=subprocess.PIPE,
    #         text=True
    #     )
    #     stdout, stderr = process.communicate()
        
    #     if process.returncode != 0:
    #         error_msg = f"Command failed with code {process.returncode}: {stderr}"
    #         print(error_msg)
    #         raise Exception(error_msg)
            
    #     print(f"Command output: {stdout}")
    #     return stdout, stderr

    # def _ensure_bucket_exists(self):
    #     try:
    #         self._run_command(
    #             f'akavecli ipc bucket create {self.default_bucket} '
    #             f'--node-address={self.node_address} '
    #             f'--private-key "{self.private_key}"'
    #         )
    #     except Exception as e:
    #         if "already exists" not in str(e):
    #             raise e

    # async def create_bucket(self, bucket_name: str) -> str:
    #     command = (
    #         f'akavecli ipc bucket create {bucket_name} '
    #         f'--node-address={self.node_address} '
    #         f'--private-key "{self.private_key}"'
    #     )
    #     stdout, _ = self._run_command(command)
    #     return stdout

    # async def upload_file(
    #     self, 
    #     bucket_name: str, 
    #     file_data: Union[bytes, BinaryIO], 
    #     file_name: str
    # ) -> str:
    #     with NamedTemporaryFile(delete=False) as temp_file:
    #         # Handle both bytes and BinaryIO
    #         if isinstance(file_data, bytes):
    #             temp_file.write(file_data)
    #         else:
    #             temp_file.write(file_data.read())
            
    #         temp_file.flush()
            
    #         try:
    #             command = (
    #                 f'akavecli ipc file upload {bucket_name} {temp_file.name} '
    #                 f'--name {file_name} '
    #                 f'--node-address={self.node_address} '
    #                 f'--private-key "{self.private_key}"'
    #             )
    #             stdout, _ = self._run_command(command)
    #             return stdout.strip()  # Remove any whitespace
    #         finally:
    #             os.unlink(temp_file.name)  # Clean up temp file

    # async def download_file(self, bucket_name: str, file_name: str, destination: str) -> str:
    #     command = (
    #         f'akavecli ipc file download {bucket_name} {file_name} {destination} '
    #         f'--node-address={self.node_address} '
    #         f'--private-key "{self.private_key}"'
    #     )
    #     stdout, _ = self._run_command(command)
    #     return stdout

    # async def list_files(self, bucket_name: str) -> str:
    #     command = (
    #         f'akavecli ipc file list {bucket_name} '
    #         f'--node-address={self.node_address} '
    #         f'--private-key "{self.private_key}"'
    #     )
    #     stdout, _ = self._run_command(command)
    #     return stdout