import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def analyze_log(log_text):

    prompt = f"""
    You are a Senior DevOps Engineer.

    Analyze the following log.

    Provide:

    1. Root Cause
    2. Severity
    3. Suggested Fix
    4. Commands to Run

    Log:

    {log_text}
    """

    response = model.generate_content(prompt)

    return response.text