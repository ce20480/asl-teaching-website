# ASL Teaching Website Frontend

## Overview

React-based frontend for ASL teaching platform with real-time sign language detection and storage capabilities.

## Setup

```bash
npm install
npm run dev
```

## Development

- Frontend runs on port 5173 or 5174 (Vite default)
- Configuration in `src/config.ts` for API endpoints
- Uses shadcn/ui for components
- Implements file upload with preview functionality

## Key Features

- Real-time sign language detection interface
- File upload with preview
- Connection to Express middleware server
- Filecoin storage integration

## Common Issues

1. CORS errors when connecting directly to Python backend
   - Always route through Express middleware (port 3000)
2. File upload size limits
   - Configure in both frontend and backend
3. Environment variables
   - Check `.env` for API endpoints

## Project Structure

```
src/
├── components/
│   ├── features/    # Feature-specific components
│   └── ui/         # Reusable UI components
├── services/
│   └── api/        # API integration
└── pages/          # Route components
```
