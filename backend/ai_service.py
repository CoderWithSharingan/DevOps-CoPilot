import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def analyze_log(log_text):
    prompt = f"""
You are a Senior DevOps Engineer.

Analyze the following DevOps log.

Identify the log type from:
- Docker
- Jenkins
- Kubernetes
- AWS
- Linux/System
- Unknown

Severity Guidelines:

Low = informational issue with no service impact

Medium = degraded functionality but service remains available

High = build failure, authentication failure, service disruption, container crash, pod failure

Critical = production outage, data loss, security breach, complete service unavailability

Commands Guidelines:

- Provide only real and valid commands
- Do not invent commands
- List each command on a new line
- Provide 3 to 5 commands maximum
- Commands should help diagnose and fix the issue

Suggested Fix Guidelines:

- Provide 1 to 2 practical remediation steps
- Explain what should be checked and why
- Keep the explanation concise

Return ONLY in this format:

Log Type:
<detected type>

Root Cause:
<one concise sentence>

Severity:
Low | Medium | High | Critical

Suggested Fix:
<1-2 concise sentences>

Commands:
<one command per line>

Keep the entire response under 150 words.

Log:
{log_text}
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0,
            max_tokens=300
        )

        return response.choices[0].message.content

    except Exception as e:
        return f"AI Service Error: {str(e)}"