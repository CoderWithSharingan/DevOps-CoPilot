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

Return ONLY in this format:

Root Cause:
<one concise sentence>

Severity:
Low | Medium | High | Critical

Suggested Fix:
<concise fix>

Commands:
<commands if applicable>

Keep the entire response under 150 words.

Log:
{log_text}
"""
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"AI Service Error: {str(e)}"