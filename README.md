# DevOps Copilot

DevOps Copilot is an AI-powered troubleshooting assistant that helps DevOps engineers analyze logs, identify root causes, assess severity, and generate remediation steps.

## Features

### Current Features

* Upload log files through a REST API
* AI-powered log analysis using Google Gemini
* Root cause identification
* Severity assessment
* Suggested remediation steps
* Recommended troubleshooting commands
* Interactive API documentation using Swagger UI

### Planned Features

* React frontend dashboard
* Drag-and-drop log uploads
* Jenkins log analysis
* Docker log analysis
* Kubernetes log analysis
* AWS CloudWatch log analysis
* Runbook generation
* Multi-agent architecture
* Docker containerization
* Cloud deployment

## Architecture

```text
User
 ↓
FastAPI Backend
 ↓
AI Service Layer
 ↓
Google Gemini
 ↓
Analysis Response
```

## Tech Stack

### Backend

* Python
* FastAPI
* Uvicorn
* Google Gemini API
* Python Dotenv

### Frontend (Planned)

* React
* Axios

### Version Control

* Git
* GitHub

## Example Workflow

```text
Upload Log
     ↓
Read Log Content
     ↓
AI Analysis
     ↓
Root Cause
     ↓
Suggested Fix
     ↓
Commands
```

## Sample Output

```text
Root Cause:
Docker registry authentication failure

Severity:
High

Suggested Fix:
Authenticate with the registry and verify permissions.

Commands:
docker login
docker pull <image>
```

## Project Structure

```text
devops-copilot/
│
├── backend/
│   ├── main.py
│   ├── ai_service.py
│   ├── test_ai_service.py
│   └── test_gemini_api.py
│
├── frontend/
│
├── README.md
└── .gitignore
```

## Getting Started

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

```bash
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install fastapi uvicorn python-dotenv google-generativeai python-multipart
```

### Run Application

```bash
uvicorn main:app --reload
```

### Open Swagger UI

```text
http://127.0.0.1:8000/docs
```

## Roadmap

* [x] FastAPI Backend
* [x] File Upload API
* [x] File Content Processing
* [x] Gemini AI Integration
* [x] AI-Powered Log Analysis
* [ ] Structured Response Formatting
* [ ] React Frontend
* [ ] Multi-Agent Workflow
* [ ] Docker Support
* [ ] Kubernetes Support
* [ ] AWS Support
* [ ] Cloud Deployment

## Motivation

DevOps engineers spend significant time manually investigating logs and infrastructure failures. DevOps Copilot aims to reduce troubleshooting time by automatically identifying root causes and generating actionable remediation steps.