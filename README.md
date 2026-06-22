# DevOps Copilot

DevOps Copilot is an AI-powered troubleshooting assistant designed to help DevOps engineers analyze logs, identify root causes, and generate remediation steps.

## Current Features

* FastAPI backend
* File upload endpoint
* Log file content extraction
* Interactive API documentation with Swagger UI

## Planned Features

* AI-powered log analysis
* Root cause detection
* Suggested fixes and commands
* Support for Jenkins, Docker, Kubernetes, Linux, and AWS logs
* React frontend dashboard
* Multi-agent architecture
* Docker deployment
* Cloud deployment on AMD Developer Cloud

## Tech Stack

### Backend

* Python
* FastAPI
* Uvicorn

### Frontend (Planned)

* React
* Axios

### AI (Planned)

* Google Gemini API
* LangChain

## Project Structure

```
devops-copilot/
├── backend/
├── frontend/
├── README.md
└── .gitignore
```

## Getting Started

### Clone Repository

```bash
git clone https://github.com/CoderWithSharingan/DevOps-CoPilot.git
cd devops-copilot
```

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
pip install fastapi uvicorn python-multipart python-dotenv
```

### Run Application

```bash
uvicorn main:app --reload
```

### Open API Docs

```
http://127.0.0.1:8000/docs
```

## Roadmap

* [x] FastAPI setup
* [x] File upload endpoint
* [x] Read uploaded file contents
* [ ] AI log analysis
* [ ] Root cause detection
* [ ] React frontend
* [ ] Multi-agent workflow
* [ ] Docker deployment
* [ ] AMD Cloud deployment

```
```
