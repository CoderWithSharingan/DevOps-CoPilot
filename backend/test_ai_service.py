from ai_service import analyze_log

result = analyze_log(
    "docker pull failed access denied"
)

print(result)