# ASL Teaching Website

## Project Overview

Full-stack application for ASL (American Sign Language) teaching with real-time detection and Filecoin storage integration.

## Architecture

```
asl-teaching-website/
├── frontend/          # React + Vite frontend
├── backend/
│   ├── express/      # Express middleware server
│   └── python/       # FastAPI + ML backend
└── docs/             # Additional documentation
```

## Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- Poetry
- Docker Desktop
- Akave API credentials

### Environment Setup

1. Clone repository:

```bash
git clone https://github.com/yourusername/asl-teaching-website.git
cd asl-teaching-website
```

2. Configure environment:

```bash
# Backend Python
cd backend/python
cp .env.example .env
# Edit .env with your Akave credentials

# Frontend
cd ../../frontend
cp .env.example .env
```

### Starting Services

1. Start Akave Storage (required for file operations):

```bash
cd backend/python
poetry run akave start
```

2. Start Python Backend:

```bash
cd backend/python
poetry install
poetry run dev
```

3. Start Express Middleware:

```bash
cd backend/express
npm install
npm run dev
```

4. Start Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Service Architecture

| Service    | Port | Description                  |
| ---------- | ---- | ---------------------------- |
| Frontend   | 5173 | Vite + React UI              |
| Express    | 3000 | Middleware & request routing |
| FastAPI    | 8000 | ML & storage backend         |
| Akave Link | 4000 | Filecoin storage integration |

## Development Notes

### Port Conflicts

```bash
# Check ports in use
lsof -i :8000
lsof -i :3000
lsof -i :4000

# Kill process on specific port
lsof -ti :8000 | xargs kill -9
```

### File Upload Constraints

- Minimum size: 127 bytes
- Maximum size: 100MB
- Supported types: Images, Video, Text

### Testing

```bash
# Frontend tests
cd frontend
npm test

# Python backend tests
cd backend/python
poetry run test

# Express tests
cd backend/express
npm test
```

## Additional Documentation

- [Frontend README](./frontend/README.md)
- [Express Server README](./backend/express/README.md)
- [Python Backend README](./backend/python/README.md)
- [API Documentation](./docs/api.md)

## Common Issues

### Multiple Python Servers

When using `poetry run dev`, two processes are normal:

- Watcher process for auto-reload
- Application server process

### Docker Container Management

```bash
# View container logs
docker logs akavelink

# Restart container
poetry run akave restart

# Stop container
poetry run akave stop
```

### CORS Issues

Default allowed origins:

- `http://localhost:5173` (Frontend)
- `http://localhost:3000` (Express)
- `http://localhost:8000` (FastAPI)

## License

[Add your license information here]
