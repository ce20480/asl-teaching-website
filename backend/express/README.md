# Express Middleware Server

## Overview

Express server acting as middleware between frontend and Python backend.

## Setup

```bash
npm install
npm run dev
```

## Development

- Server runs on port 3000
- Proxies requests to Python backend (port 8000)
- Handles file upload processing

## Configuration

```typescript
export const config = {
  port: 3000,
  pythonApiUrl: "http://localhost:8000",
  corsOrigins: ["http://localhost:5173", "http://localhost:5174"],
};
```

## Key Features

- CORS handling
- File upload processing
- Request forwarding to Python
- Error handling

## Common Issues

1. Port conflicts
   - Ensure no other service runs on port 3000
2. File size limits
   - Configure multer limits
3. CORS configuration
   - Update allowed origins for development/production

## Project Structure

```
src/
├── routes/         # API routes
├── config.ts       # Configuration
└── server.ts       # Server setup
```
