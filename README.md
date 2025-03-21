# ASL Teaching Website

SignLang: Empowering Accessibility through Open-Source and Decentralization

Every day, millions rely on sign language to communicate—but access to high-quality sign language translation remains limited, expensive, and monopolized by big tech. Current solutions are often inaccessible due to high costs, limited availability, and proprietary restrictions, creating significant barriers in critical areas such as healthcare, education, and everyday interactions.

SignLang is here to disrupt this. We’re building an open-source, decentralized American Sign Language (ASL) translator, leveraging the power of the Filecoin ecosystem and its decentralized storage (Akave, Storacha, Lighthouse, Recall) and compute services (Lilypad).

The Problem We're Solving:

Educational Barriers: Many educational institutions lack affordable, reliable ASL translation resources, limiting opportunities for Deaf and hard-of-hearing students.

Healthcare Communication: Miscommunication in healthcare settings due to limited interpreter availability can lead to severe misunderstandings and reduced quality of care.

Accessibility in Daily Life: Dependence on costly human interpreters or centralized, proprietary translation solutions leaves many users isolated, unable to communicate spontaneously or in real-time.

Our Vision

We envision a future where sign language translation models aren't gatekept by conglomerates but grown organically by the community itself. The availability of comprehensive training data remains a significant barrier—but we've turned this challenge into our greatest opportunity.

How it Works:

Community-Driven Data Collection: Our initial app helps users learn and practice ASL. As users improve, they contribute high-quality, user-generated videos back into our dataset, enriching the model organically.

Decentralized Storage (Filecoin Network): We utilize decentralized storage providers like Akave, Storacha, Lighthouse, and Recall. Filecoin’s incentivized storage network ensures secure, censorship-resistant, and privacy-focused data hosting.

Decentralized Compute with Lilypad: By leveraging Lilypad’s decentralized compute network, SignLang runs translations without reliance on centralized cloud providers—lowering costs and preserving user privacy.

Progress So Far:

Filecoin Storage: We've explored multiple storage providers:

Storacha: Successfully storing and retrieving data.

Akave: Exploring secure storage via private keys.

Lighthouse: Simple, reliable data handling.

Lilypad Compute: A working Lilypad module now executes our translation model using decentralized compute resources.

Long-Term Impact:

Our ambition goes beyond simply translating ASL. By creating a robust, decentralized dataset, we empower a global community to continuously improve and expand the translation model. Applications include real-time healthcare communication, educational resources, and accessible, barrier-free everyday interactions.

Why Decentralized & Open Source?

Decentralization ensures transparency, accessibility, and sustainability, turning users into active participants—not passive consumers. Open sourcing our model accelerates innovation, ensuring everyone benefits.

Join SignLang—let's democratize sign language translation, break barriers together, and build a more inclusive world.

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
