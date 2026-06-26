import "./App.css";
import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState("");
  const [copiedCommand, setCopiedCommand] = useState("");

   const handleFileChange = (e) => {
   const selectedFile = e.target.files[0];

  if (selectedFile) {
    setFile(selectedFile);
    setFileName(selectedFile.name);
  }
};
  
  const parseAnalysis = (text) => {
  return {
    logType:
      text.match(/Log Type:\s*([\s\S]*?)Root Cause:/i)?.[1]?.trim() || "",

    rootCause:
      text.match(/Root Cause:\s*([\s\S]*?)Executive Summary:/i)?.[1]?.trim() || "",

    summary:
      text.match(/Executive Summary:\s*([\s\S]*?)Severity:/i)?.[1]?.trim() || "",

    severity:
      text.match(/Severity:\s*(.*?)\s*Confidence:/is)?.[1]?.trim() || "",

    confidence:
      text.match(/Confidence:\s*(\d+)/i)?.[1]?.trim() || "",

    evidence:
      text.match(/Evidence:\s*([\s\S]*?)Suggested Fix:/i)?.[1]?.trim() || "",

    fix:
      text.match(/Suggested Fix:\s*([\s\S]*?)Prevention:/i)?.[1]?.trim() || "",

    prevention:
      text.match(/Prevention:\s*([\s\S]*?)Runbook:/i)?.[1]?.trim() || "",
    
    runbook:
      text.match(/Runbook:\s*([\s\S]*?)Commands:/i)?.[1]?.trim() || "",

    commands:
      text.match(/Commands:\s*([\s\S]*)$/i)?.[1]?.trim() || ""
  };
};

  const handleAnalyze = async () => {
  if (!file) {
    alert("Please select a file");
    return;
  }

  try {
    setLoading(true);
    setProgress(10);
    setLoadingMessage("Uploading log...");
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    setProgress(30);
    setLoadingMessage("Extracting log data...");

    const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/upload`,
      formData
      );
    setProgress(60);
    setLoadingMessage("Analyzing root cause...");
    console.log(response.data.analysis);
    
    const parsed = parseAnalysis(
      response.data.analysis
    );
    setProgress(80);
    setLoadingMessage("Generating AI runbook...");
    console.log("parsed")

    setProgress(100);
    setAnalysis(parsed);

  } catch (err) {
    setError("Failed to analyze log");
    console.error(err);
  } finally {
    setLoading(false);
    setLoadingMessage("");
  }
};

const exportPDF = () => {
  if (!analysis) return;

  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("DevOps Copilot Incident Report", 20, 20);

  doc.setFontSize(12);

  let y = 40;

  const addSection = (title, content) => {
    doc.setFont(undefined, "bold");
    doc.text(title, 20, y);
    y += 8;

    doc.setFont(undefined, "normal");

    const lines = doc.splitTextToSize(
      content || "N/A",
      170
    );

    doc.text(lines, 20, y);

    y += lines.length * 7 + 10;
  };

  addSection("Log Type", analysis.logType);
  addSection("Severity", analysis.severity);
  addSection(
    "Confidence",
    `${analysis.confidence}%`
  );
  addSection(
    "Root Cause",
    analysis.rootCause
  );
  addSection(
    "Evidence",
    analysis.evidence
  );
  addSection(
    "Suggested Fix",
    analysis.fix
  );
  addSection(
    "Prevention",
    analysis.prevention
  );
  addSection(
    "AI Runbook",
    analysis.runbook
  );
  addSection(
    "Commands",
    analysis.commands
  );

  doc.save(
    `${analysis.logType}-incident-report.pdf`
  );
};
const copyCommand = async (command) => {
  try {
    await navigator.clipboard.writeText(command);

    setCopiedCommand(command);

    setTimeout(() => {
      setCopiedCommand("");
    }, 2000);

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="app">

      <div className="title">
        <h1>DevOps Copilot AI</h1>
        <p>AI-Powered Incident Analysis</p>
      </div>

      <div className="upload-card">

  <h2 className="upload-title">
      Upload DevOps Log
  </h2>

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
    disabled={loading}
  >
    {loading ? "Analyzing..." : "Analyze Log"}
  </button>

</div>
      {loading && (
  <div className="loading-card">
    <div className="loader"></div>

    <h3>{loadingMessage}</h3>

<div className="progress-container">
  <div
    className="progress-fill"
    style={{ width: `${progress}%` }}
  ></div>
</div>

<p>{progress}% Complete</p>

    <p>
      AI is analyzing your incident...
    </p>
  </div>
)}
      {error && (
  <div className="analysis-card severity-card">
    <h3 className="card-title">
      Error
    </h3>

    <p>{error}</p>
  </div>
)}
    {!analysis && !loading && !error && (
  <div className="empty-state">
    <div className="empty-icon">🚨</div>

    <h2>Analyze Your First Incident</h2>

    <p>
      Upload a DevOps log file to generate an AI-powered incident report.
    </p>

    <div className="empty-features">
      <div>✓ Root Cause Analysis</div>
      <div>✓ Severity Assessment</div>
      <div>✓ Confidence Score</div>
      <div>✓ Evidence Extraction</div>
      <div>✓ AI Runbook Generation</div>
      <div>✓ Recovery Commands</div>
    </div>
  </div>
)}

      {analysis && (
  <div>
    <div
      className={`incident-banner ${analysis.severity
        .toLowerCase()
        .trim()}`}
    >
  <div className="banner-top">

    <div className="incident-header">
      <span className="incident-severity">
        {analysis.severity.toUpperCase()} INCIDENT
      </span>

      <h2>{analysis.logType}</h2>
    </div>
          <button
          className="export-btn"
          onClick={exportPDF}
        >
          📄 Export Report
        </button>
  </div>

      <div className="detected-components">
        <span>Detected Components</span>

        <div className="component-chip">
          {analysis.logType}
        </div>
      </div>
      <div className="confidence-section">
  <span>Confidence</span>

  <div
    className={`confidence-chip ${
      Number(analysis.confidence) >= 90
        ? "confidence-high"
        : Number(analysis.confidence) >= 75
        ? "confidence-medium"
        : "confidence-low"
    }`}
  >
    {analysis.confidence}%
  </div>
</div>

</div>

    <div className="incident-report">
      <div className="analysis-card summary-card">
        <h3 className="card-title">
          📋 Executive Summary
        </h3>

        <p>{analysis.summary}</p>
      </div>

      <div className="analysis-card">
        <h3 className="card-title">
          Root Cause
        </h3>

        <p>{analysis.rootCause}</p>
      </div>

      <div className="analysis-card">
        <h3 className="card-title">
          Evidence
        </h3>

        <div className="evidence-list">
          {analysis.evidence
            .split("\n")
            .filter((line) => line.trim())
            .map((line, index) => {
              let type = "";

              if (
                line.toLowerCase().includes("error") ||
                line.toLowerCase().includes("crash") ||
                line.toLowerCase().includes("failed") ||
                line.toLowerCase().includes("exit code") ||
                line.toLowerCase().includes("exited") ||
                line.toLowerCase().includes("exception")
              ) {
                type = "error";
              } else if (
                line.toLowerCase().includes("warning") ||
                line.toLowerCase().includes("warn")
              ) {
                type = "warning";
              }

              return (
                <div
                  key={index}
                  className={`evidence-item ${type}`}
                >
                  {line}
                </div>
              );
            })}
        </div>
      </div>

      <div className="analysis-card">
        <h3 className="card-title">
          Suggested Fix
        </h3>

        <p>{analysis.fix}</p>
      </div>

      <div className="analysis-card">
        <h3 className="card-title">
          Prevention
        </h3>

        <pre style={{ whiteSpace: "pre-wrap" }}>
          {analysis.prevention}
        </pre>
      </div>

      <div className="analysis-card">
  <h3 className="card-title">
    AI Runbook
  </h3>

  <div className="runbook-list">
    {(analysis.runbook || "")
      .split("Step")
      .filter(Boolean)
      .map((step, index) => (
        <div
          key={index}
          className="runbook-step"
        >
          <span className="step-number">
            {index + 1}
          </span>

          <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
            {step.trim().replace(/^\d+\s*:\s*/, "")}
          </pre>
        </div>
      ))}
  </div>
</div>  

      <div className="analysis-card commands-card">
  <h3 className="card-title">
    Commands
  </h3>

  {(analysis.commands || "")
    .split("\n")
    .filter(cmd => cmd.trim())
    .map((cmd, index) => (
      <div
        key={index}
        className="command-item"
      >
        <code>{cmd}</code>

        <button
        className={`copy-btn ${
          copiedCommand === cmd ? "copied" : ""
        }`}
        onClick={() => copyCommand(cmd)}
      >
        {copiedCommand === cmd ? "✓ Copied" : "📋 Copy"}
      </button>
      </div>
    ))}
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
          Powered by Groq AI • Built with React & FastAPI
      </footer>

    </div>
  );
}

export default App;