from typing import Any, Dict
import aiohttp
import json

class LilypadService:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.lilypad.network"

    async def submit_job(self, model_input: Dict[str, Any]) -> str:
        async with aiohttp.ClientSession() as session:
            job_config = {
                "module": "asl-detection",
                "input": model_input,
                "resources": {
                    "gpu": True,
                    "cpu": 1,
                    "memory": "4Gi"
                }
            }
            
            async with session.post(
                f"{self.base_url}/jobs",
                json=job_config,
                headers={"Authorization": f"Bearer {self.api_key}"}
            ) as response:
                return await response.json()