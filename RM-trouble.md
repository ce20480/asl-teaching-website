# Troubleshooting Guide for Running ASL Teaching Website

## Project Structure
```bash
asl-teaching-website/
├── backend/
│   ├── python/         # Python backend code
│   │   ├── Dockerfile  # Python container definition
│   │   ├── pyproject.toml  # Poetry dependencies and config
│   │   ├── poetry.lock    # Poetry lock file
│   │   └── src/        # Source code with main.py
│   └── express/        # Express backend code
│       └── Dockerfile  # Express container definition
├── docker-compose.yml  # Service orchestration
└── frontend/           # React frontend code
```

## Option 1: Running with Docker (Recommended)

1. Make sure Docker Desktop is running
2. Pull the Akave image:
```bash
docker pull akave/akavelink:latest
```

3. Start all services:
```bash
docker-compose up -d
```

4. Verify services:
```bash
docker-compose ps
# Should see express, python, and akavelink running
```

5. View logs:
```bash
docker-compose logs -f
```

6. Stop services:
```bash
docker-compose down
```

## Option 2: Running Locally (Development)

### 1. Frontend Setup (Terminal 1)
```bash
cd frontend
npm install              # Install dependencies
npm run dev              # Run frontend server
# Available at http://localhost:5173
```

### 2. Express Backend Setup (Terminal 2)
```bash
cd backend/express
npm install              # Install dependencies
npm run dev              # Run Express server
# Available at http://localhost:3000
```

### 3. Python Backend Setup (Terminal 3)
```bash
# Install Poetry (one time setup)
curl -sSL https://install.python-poetry.org | python3 -

# Install dependencies
cd backend/python
poetry install

# Run the development server
poetry run uvicorn src.main:app --reload
# Available at http://localhost:8000

# If port 8000 is in use, try:
poetry run uvicorn src.main:app --reload --port 8001
```

## Common Issues & Solutions

### Docker Issues
- Make sure Docker Desktop is running
- If ports are in use, stop local services or modify port mappings in docker-compose.yml
- Use `docker-compose logs -f` to debug issues
- If containers fail, try `docker-compose down` then `docker-compose up -d`

### Poetry Issues (Local Setup)
- Make sure Poetry is installed globally
- Run poetry commands from `backend/python` directory
- If dependencies are out of sync, delete poetry.lock and run `poetry install` again
- Use `poetry shell` to activate virtual environment if needed

### Port In Use (Address already in use)
- Check for other terminal windows running servers
- Use different port with `--port` flag
- Or restart terminal/computer if process is stuck
- For Docker, make sure no local services are using required ports

### Dependencies
- Frontend: Uses npm (package.json)
- Express: Uses npm (package.json)
- Python: Uses Poetry (pyproject.toml)
- Docker handles dependencies automatically

### Running Order (Local Setup)
1. Start Python backend first
2. Start Express backend second
3. Start Frontend last

Remember: All three services must be running simultaneously for the application to work properly. 