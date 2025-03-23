import asyncio
from pathlib import Path
from .akave_sdk import AkaveSDK, AkaveConfig

async def example_usage():
    # Initialize SDK with custom config
    config = AkaveConfig(host="http://localhost:4000")
    
    async with AkaveSDK(config) as akave:
        try:
            print("Akave SDK initialized")
            # Create a bucket
            await akave.create_bucket("test-bucket")
            print("Bucket created")
            
            # List buckets
            buckets = await akave.list_buckets()
            print("Available buckets:", buckets)
            
            # Upload a file
            test_file = Path("test.txt")
            test_file.write_text("Hello, Akave!")  # Minimum 127 bytes
            
            result = await akave.upload_file("test-bucket", test_file)
            print("Upload result:", result)
            
            # List files
            files = await akave.list_files("test-bucket")
            print("Files in bucket:", files)
            
            # Download file
            downloaded = await akave.download_file(
                "test-bucket",
                "test.txt",
                "downloaded.txt"
            )
            print("File downloaded to:", downloaded)
            
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(example_usage())