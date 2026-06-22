from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from ai_service import analyze_log

app = FastAPI()

# Allow React frontend to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "DevOps Copilot Running"}

@app.post("/upload")
async def upload_log(file: UploadFile = File(...)):
    contents = await file.read()

    log_text = contents.decode("utf-8")

    analysis = analyze_log(log_text)

    return {
        "filename": file.filename,
        "analysis": analysis
    }