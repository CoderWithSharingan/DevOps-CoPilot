from fastapi import FastAPI, UploadFile, File
from ai_service import analyze_log

app = FastAPI()

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