from fastapi import FastAPI, UploadFile, File

app = FastAPI()

@app.get("/")
def home():
    return {"message": "DevOps Copilot Running"}

@app.post("/upload")
async def upload_log(file: UploadFile = File(...)):
    contents = await file.read()

    log_text = contents.decode("utf-8")

    return {
        "filename": file.filename,
        "content": log_text
    }