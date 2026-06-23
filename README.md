# DevOps Copilot

AI-Powered DevOps Incident Analysis Tool built using React, FastAPI, and Google Gemini AI.

DevOps Copilot helps engineers quickly analyze logs, identify root causes, assess severity, and receive suggested fixes along with troubleshooting commands.

---

## Features

-  Upload DevOps log files
-  AI-powered log analysis using Gemini AI
-  Automatic Log Type Detection
- Docker
- Jenkins
- Kubernetes
- AWS
- Linux/System Logs
- Severity Classification
- Low
- Medium
- High
- Critical
- Suggested Fix Recommendations
- Troubleshooting Command Generation
- Modern React Dashboard UI
- FastAPI Backend

---

## Tech Stack

### Frontend
- React
- Vite
- Axios
- CSS

### Backend
- FastAPI
- Python
- Google Gemini API
- Uvicorn
- Python Dotenv

---

## Project Structure

```text
DevOps-CoPilot/
│
├── backend/
│   ├── main.py
│   ├── ai_service.py
│   ├── .env
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## How It Works

1. User uploads a DevOps log file.
2. FastAPI receives the log.
3. Gemini AI analyzes the log.
4. The AI identifies:
   - Log Type
   - Root Cause
   - Severity
   - Suggested Fix
   - Commands
5. Results are displayed in a structured dashboard.

---

## Example Output

### Log Type

Docker

### Root Cause

Authentication failure when pulling an image from a Docker registry.

### Severity

High

### Suggested Fix

Authenticate with the registry and verify repository permissions.

### Commands

```bash
docker login <registry_url>
docker pull <image_name>
cat ~/.docker/config.json
```

---

## Setup

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Run:

```bash
uvicorn main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Future Enhancements

- Multi-Agent Analysis
- Historical Incident Tracking
- CloudWatch Integration
- Kubernetes Cluster Diagnostics
- Jenkins Pipeline Analysis
- PDF Report Generation
- AI Chat Assistant for Incident Resolution

---

## Screenshots

### Jenkins Log Analysis

![Jenkins Analysis](screenshots/jenkins-analysis.png)

### Kubernetes Log Analysis

![Kubernetes Analysis](screenshots/kubernetes-analysis.png)