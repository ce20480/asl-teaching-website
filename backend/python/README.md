# Python FastAPI Backend

## Overview

FastAPI server handling ML model integration and Filecoin storage.

## Setup

```bash
# Install Poetry
curl -sSL https://install.python-poetry.org | python3 -

# Install dependencies
poetry install

# Run development server
poetry run dev
```

## Development

- Server runs on port 8000
- Uses Poetry for dependency management
- FastAPI for API endpoints

## Configuration

- Environment variables in `.env`
- CORS settings in `main.py`
- Poetry configuration in `pyproject.toml`

## Key Features

- File storage handling
- ML model integration
- Filecoin integration
- Type-safe API endpoints

## Common Issues

1. Multiple server instances
   - Use `poetry run dev` only
   - Check for zombie processes
2. Import errors
   - Ensure proper Python path
   - Use absolute imports
3. Poetry setup
   - Configure virtualenv correctly
   - Include src directory in packages

## Project Structure

```
backend/python/
├── pyproject.toml  # Poetry configuration
├── scripts/        # Development scripts
└── src/
    ├── api/       # API routes
    ├── core/      # Core configuration
    └── services/  # Business logic
```

## Environment Variables

```env
WEB3_PRIVATE_KEY=your_key_here
NODE_ADDRESS=connect.akave.ai:5500
DEFAULT_BUCKET=asl-training-data
```
