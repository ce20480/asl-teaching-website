from .base import StorageProvider
import os
import subprocess
from typing import Optional, BinaryIO
from pathlib import Path
from tempfile import NamedTemporaryFile

class AkaveStorageService(StorageProvider):
    def __init__(self, private_key: str, node_address: str, default_bucket: str):
        # if Path(private_key_path).is_file():
        #     self.private_key = self._load_private_key(private_key_path)
        self.private_key = private_key
        self.node_address = node_address
        self.default_bucket = default_bucket
        self._ensure_bucket_exists()

    def _load_private_key(self, key_path: str) -> str:
        path = os.path.expanduser(key_path)
        with open(path, 'r') as f:
            return f.read().strip()

    def _run_command(self, command: str) -> tuple[str, str]:
        process = subprocess.Popen(
            command,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        stdout, stderr = process.communicate()
        if process.returncode != 0:
            raise Exception(f"Command failed: {stderr}")
        return stdout, stderr

    def _ensure_bucket_exists(self):
        try:
            self._run_command(
                f'akavecli ipc bucket create {self.default_bucket} '
                f'--node-address={self.node_address} '
                f'--private-key "{self.private_key}"'
            )
        except Exception as e:
            if "already exists" not in str(e):
                raise e

    async def create_bucket(self, bucket_name: str) -> str:
        command = (
            f'akavecli ipc bucket create {bucket_name} '
            f'--node-address={self.node_address} '
            f'--private-key "{self.private_key}"'
        )
        stdout, _ = self._run_command(command)
        return stdout

    async def upload_file(self, bucket_name: str, file_data: BinaryIO, file_name: str) -> str:
        with NamedTemporaryFile(delete=False) as temp_file:
            temp_file.write(file_data.read())
            temp_file.flush()
            
            try:
                command = (
                    f'akavecli ipc file upload {bucket_name} {temp_file.name} '
                    f'--node-address={self.node_address} '
                    f'--private-key "{self.private_key}"'
                )
                stdout, _ = self._run_command(command)
                return stdout
            finally:
                os.unlink(temp_file.name)

    async def download_file(self, bucket_name: str, file_name: str, destination: str) -> str:
        command = (
            f'akavecli ipc file download {bucket_name} {file_name} {destination} '
            f'--node-address={self.node_address} '
            f'--private-key "{self.private_key}"'
        )
        stdout, _ = self._run_command(command)
        return stdout

    async def list_files(self, bucket_name: str) -> str:
        command = (
            f'akavecli ipc file list {bucket_name} '
            f'--node-address={self.node_address} '
            f'--private-key "{self.private_key}"'
        )
        stdout, _ = self._run_command(command)
        return stdout