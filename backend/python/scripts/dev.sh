#!/bin/bash

# Activate pyenv virtual environment
eval "$(pyenv init -)"
pyenv activate asl-detect-3.11.0

# Run the FastAPI server
uvicorn src.main:app --reload --port 8000