# LinkedIn Baddie Finder

This repository now contains a minimal full-stack scaffold:

- `client/` – React 18 + Vite frontend
- `server/` – FastAPI backend

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The React app expects the API to be available at `http://127.0.0.1:8000`, configurable via the `VITE_API_URL` env var in the frontend.
