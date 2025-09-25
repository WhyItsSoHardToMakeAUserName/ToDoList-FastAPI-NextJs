# Task Management App

A full-stack task management application with FastAPI backend and Next.js frontend.

## Prerequisites

- Python 3.8+
- Node.js 16+
- pnpm (recommended) or npm

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```
Create and activate a virtual environment:

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

Install Python dependencies:
```bash
pip install -r requirements.txt
```

launch backend 
```bash
uvicorn src.main:app --reload
```

The backend will be available at: http://127.0.0.1:8000

API Documentation: http://127.0.0.1:8000/docs (Swagger UI)

## Frontend Setup
Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```
Install dependencies:

```bash
pnpm install
```
Start the development server:

```bash
pnpm run dev
```
The frontend will be available at: http://localhost:3000