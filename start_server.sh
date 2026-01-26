#!/bin/bash
# Script to start the FastAPI server

cd "$(dirname "$0")/server"

# Activate virtual environment
source venv/bin/activate

# Start the server with auto-reload
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

