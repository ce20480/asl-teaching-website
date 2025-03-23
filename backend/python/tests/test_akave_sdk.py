import pytest
import aiohttp
from pathlib import Path
from src.services.storage.akave_sdk import AkaveSDK, AkaveConfig, AkaveError

@pytest.fixture
async def akave_sdk():
    """Provide an AkaveSDK instance for testing"""
    config = AkaveConfig(host="http://localhost:4000")
    async with AkaveSDK(config) as sdk:
        yield sdk

@pytest.mark.asyncio
async def test_create_and_list_buckets(akave_sdk):
    """Test bucket creation and listing"""
    # Create test bucket
    bucket_name = "test-bucket"
    result = await akave_sdk.create_bucket(bucket_name)
    assert result.get("success") is True
    
    # List buckets
    buckets = await akave_sdk.list_buckets()
    assert bucket_name in [b["Name"] for b in buckets.get("data", [])]

@pytest.mark.asyncio
async def test_file_upload_and_download(akave_sdk, tmp_path):
    """Test file upload and download"""
    # Create test file (>127 bytes)
    test_file = tmp_path / "test.txt"
    test_content = "Hello, Akave! " * 10  # Make sure it's over 127 bytes
    test_file.write_text(test_content)
    
    # Upload file
    bucket_name = "test-bucket"
    result = await akave_sdk.upload_file(bucket_name, test_file)
    assert result.get("success") is True
    
    # Download file
    output_path = tmp_path / "downloaded.txt"
    downloaded = await akave_sdk.download_file(
        bucket_name,
        test_file.name,
        output_path
    )
    assert output_path.read_text() == test_content

@pytest.mark.asyncio
async def test_list_files(akave_sdk):
    """Test file listing in bucket"""
    bucket_name = "test-bucket"
    files = await akave_sdk.list_files(bucket_name)
    assert isinstance(files.get("files", []), list)

@pytest.mark.asyncio
async def test_error_handling(akave_sdk):
    """Test error handling for invalid operations"""
    with pytest.raises(AkaveError):
        await akave_sdk.get_bucket("non-existent-bucket")