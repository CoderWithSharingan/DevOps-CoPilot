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

Confidence Guidelines:

- Return a confidence score between 50 and 100
- Base the score on how clearly the log supports the diagnosis
- Use higher confidence when explicit errors are present
- Use lower confidence when the diagnosis is inferred from limited evidence

Examples:

95-100 = explicit error messages directly indicate the issue
80-94 = strong indicators but some inference required
60-79 = moderate evidence with uncertainty
50-59 = weak evidence or ambiguous logs

Evidence Guidelines:

- Extract only the MOST important log lines
- Maximum 5 lines
- Put the strongest evidence first
- Use exact log lines
- Do not modify the log text
- Ignore informational lines unless they directly support the diagnosis
- Prioritize ERROR, WARN, FAILED, EXCEPTION, CRASH, TIMEOUT, OOM, ACCESS DENIED and similar indicators
- Exclude pod names, timestamps, IDs, request IDs, IP addresses, and other metadata unless they directly explain the failure.
- Prioritize actual error indicators over contextual information.

Suggested Fix Guidelines:

- Provide 1 to 2 practical remediation steps
- Keep them concise

Prevention Guidelines:

- Provide exactly 3 prevention recommendations
- Focus on monitoring, configuration, automation, or best practices
- Keep each recommendation short

Runbook Guidelines:

- Generate a practical troubleshooting runbook
- Maximum 5 steps
- Each step must contain:
  - Step title
  - Short explanation
  - Relevant command if applicable
- Commands must be realistic and executable
- Tailor steps to the detected technology
  (Jenkins, Docker, Kubernetes, AWS, Linux, etc.)
- Focus on investigation first, then remediation

Commands Guidelines:

- Provide only real and valid commands
- Do not invent commands
- List each command on a new line
- Provide 3 to 5 commands maximum
- Prefer standard troubleshooting commands
- Commands should help diagnose and fix the issue

Return ONLY in this format:

Log Type:
<detected type>

Root Cause:
<one concise sentence>

Severity:
Low | Medium | High | Critical

Confidence:
<number only>

Evidence:
<3-5 exact log lines>

Suggested Fix:
<1-2 concise sentences>

Prevention:
- recommendation 1
- recommendation 2
- recommendation 3

Runbook:

Step 1:
...

Step 2:
...

Step 3:
...

Commands:
<one command per line>

Keep the entire response under 250 words.

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