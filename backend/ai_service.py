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

Analyze the following DevOps log.

First identify the log type:
- Docker
- Jenkins
- Kubernetes
- AWS
- Linux/System
- Unknown

Return ONLY in this format:

Log Type:
<detected type>

Root Cause:
<one concise sentence>

Severity:
Low | Medium | High | Critical

Suggested Fix:
<concise fix>

Commands:
List all relevant commands required to diagnose and fix the issue.
Use plain text commands only, no markdown or backticks.

Keep the entire response under 150 words.

Log:
{log_text}
"""
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"AI Service Error: {str(e)}"