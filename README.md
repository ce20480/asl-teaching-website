# ASL Teaching Website

An interactive web application for learning American Sign Language (ASL) through real-time translation, interactive lessons, and community contributions.

## Features

- 🎥 Real-time ASL translation using camera
- 📚 Interactive ASL lessons with progress tracking
- 🌟 Reward system for learning achievements
- 🤝 Community contribution platform
- 👤 Personal profile with learning statistics

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- TailwindCSS
- Shadcn UI
- React Router Dom

### Backend

- FastAPI
- Python
- OpenCV for image processing
- Machine Learning models for ASL recognition

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)
- Git

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/asl-teaching-website.git
cd asl-teaching-website
```

2. Set up the frontend:

```bash
cd frontend
npm install
```

3. Set up the backend:

```bash
cd ../backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

## Running the Application

1. Start the frontend development server:

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

2. Start the backend server (in a new terminal):

```bash
cd backend
source venv/bin/activate  # On Windows use: venv\Scripts\activate
uvicorn main:app --reload
```

The backend API will be available at `http://localhost:8000`

## Development

### Frontend Development

- Run tests: `npm test`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

### Backend Development

- API documentation available at `http://localhost:8000/docs`
- Run tests: `pytest`
- Format code: `black .`

## Project Structure

```
asl-teaching-website/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── main.tsx
│   ├── public/
│   └── package.json
├── backend/
│   ├── app/
│   ├── tests/
│   └── requirements.txt
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to all contributors who have helped with the development
- Shadcn UI for the component library
- React and FastAPI communities for excellent documentation
