import "./App.css";
import { useState } from "react";

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    setFileName(file.name);
  }
};

  const handleAnalyze = () => {
    setAnalysis({
      rootCause:
        "Docker client is not authenticated with the registry.",
      severity: "High",
      fix:
        "Run docker login and verify repository permissions.",
      commands:
        "docker login\ndocker pull <image>"
    });
  };

  return (
    <div className="app">

      <div className="title">
        <h1>DevOps Copilot</h1>
        <p>AI-Powered Incident Analysis</p>
      </div>

      <div className="upload-card">

  <h2>Upload DevOps Log</h2>

  <p
    style={{
      color: "#94a3b8",
      marginTop: "10px",
      marginBottom: "20px"
    }}
  >
    Upload Jenkins, Docker, Kubernetes or AWS logs
  </p>

  <div className="drop-zone">

  <div className="drop-icon">
    📄
  </div>

  <h3>Drag & Drop Log File</h3>

  <p>
    or click below to browse
  </p>

  <input
    type="file"
    onChange={handleFileChange}
  />

  {fileName && (
    <p className="file-name">
      Selected: {fileName}
    </p>
  )}

</div>

  <br />

  <button
    className="upload-btn"
    onClick={handleAnalyze}
  >
    Analyze Log
  </button>

</div>

      {analysis && (
        <div className="analysis-grid">

          <div className="analysis-card">
            <h3 className="card-title">
              Root Cause
            </h3>

            <p>{analysis.rootCause}</p>
          </div>

          <div className="analysis-card">
            <h3 className="card-title">
              Severity
            </h3>

            <span
              className={`severity ${
                analysis.severity.toLowerCase().includes("high")
                  ? "high"
                  : analysis.severity.toLowerCase().includes("medium")
                  ? "medium"
                  : "low"
                }`}
                >
               {analysis.severity}
            </span>
          </div>

          <div className="analysis-card">
            <h3 className="card-title">
              Suggested Fix
            </h3>

            <p>{analysis.fix}</p>
          </div>

          <div className="analysis-card">
            <h3 className="card-title">
              Commands
            </h3>

            <div className="command-box">
              <pre>{analysis.commands}</pre>
            </div>
          </div>

        </div>
      )}
      <footer
          style={{
            textAlign: "center",
            marginTop: "50px",
            color: "#94a3b8"
          }}
        >
          Powered by Gemini AI • Built with React & FastAPI
      </footer>

    </div>
  );
}

export default App;