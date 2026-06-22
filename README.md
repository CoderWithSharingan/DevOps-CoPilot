# DevOps Copilot

AI-Powered DevOps Troubleshooting Assistant built with React, FastAPI, and Google Gemini.

DevOps Copilot helps engineers analyze logs, identify root causes, assess incident severity, and generate remediation steps in seconds.

---

## Features

### Current Features

* Upload DevOps log files
* AI-powered log analysis using Google Gemini
* Root cause identification
* Severity assessment
* Suggested remediation steps
* Recommended troubleshooting commands
* React frontend dashboard
* FastAPI backend API
* Real-time analysis results

### Supported Logs

* Docker Logs
* Jenkins Logs
* Linux System Logs
* Kubernetes Logs (Planned)
* AWS Logs (Planned)

---

## Architecture

```text
React Frontend
       ↓
Axios
       ↓
FastAPI Backend
       ↓
Gemini AI
       ↓
Structured Incident Analysis
```

---

## Tech Stack

### Frontend

* React
* Vite
* Axios
* CSS

### Backend

* Python
* FastAPI
* Uvicorn
* Google Gemini API
* Python Dotenv

### Development Tools

* Git
* GitHub
* VS Code

---

## Current Workflow

```text
Upload Log File
        ↓
Read Log Contents
        ↓
Gemini Analysis
        ↓
Root Cause Detection
        ↓
Severity Assessment
        ↓
Suggested Fixes
        ↓
Troubleshooting Commands
```

---

## Example Output

```text
Root Cause:
Docker registry authentication failure.

Severity:
High

Suggested Fix:
Authenticate with the registry and verify permissions.

Commands:
docker login
docker pull <image>
```

---

## Project Structure

```text
DevOps-CoPilot/
│
├── backend/
│   ├── main.py
│   ├── ai_service.py
│   ├── test_ai_service.py
│   ├── test_gemini.py
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

## Setup

### Clone Repository

```bash
git clone <repository-url>
cd DevOps-CoPilot
```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install fastapi uvicorn python-dotenv python-multipart google-generativeai
```

Create a `.env` file:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Start FastAPI:

```bash
uvicorn main:app --reload
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://127.0.0.1:8000
```

API Docs:

```text
http://127.0.0.1:8000/docs
```

---

## Roadmap

### Phase 1 (Completed)

* [x] FastAPI Backend
* [x] Gemini Integration
* [x] File Upload API
* [x] React Frontend
* [x] End-to-End Analysis Workflow

### Phase 2 (In Progress)

* [ ] Professional Dashboard UI
* [ ] Drag & Drop Upload
* [ ] Loading Indicators
* [ ] Analysis Cards
* [ ] Severity Badges

### Phase 3 (Planned)

* [ ] Multi-Agent Architecture
* [ ] Security Analysis Agent
* [ ] Root Cause Agent
* [ ] Fix Recommendation Agent
* [ ] Runbook Generator

### Phase 4 (Planned)

* [ ] Jenkins Integration
* [ ] Docker Integration
* [ ] Kubernetes Integration
* [ ] AWS CloudWatch Integration
* [ ] Incident History Dashboard

---

## Vision

DevOps engineers spend valuable time manually investigating logs and infrastructure failures. DevOps Copilot aims to reduce troubleshooting time by automatically identifying root causes, recommending fixes, and guiding incident resolution through an AI-powered workflow.

The long-term goal is to evolve DevOps Copilot into a multi-agent incident response platform capable of analyzing infrastructure, CI/CD pipelines, cloud environments, and application logs in real time.
