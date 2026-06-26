import "./App.css";
import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState("");
  const [copiedCommand, setCopiedCommand] = useState("");
  const [dragActive, setDragActive] = useState(false);

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
    toast.error("Please select a log file.");
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
    toast.success("Incident analysis completed successfully!");

  } catch (err) {
    setError("Failed to analyze log");
    toast.error("Analysis failed.");
    console.error(err);
  } finally {
    setLoading(false);
    setLoadingMessage("");
  }
};

const exportPDF = () => {
  if (!analysis) return;

  const doc = new jsPDF();

  const now = new Date();

const incidentId =
  "INC-" +
  now.getFullYear() +
  String(now.getMonth() + 1).padStart(2, "0") +
  String(now.getDate()).padStart(2, "0") +
  "-" +
  Math.floor(1000 + Math.random() * 9000);

const generatedOn = now.toLocaleString();

let y = 20;

// ===== Header =====

doc.setFillColor(15, 23, 42);
doc.rect(0, 0, 210, 30, "F");

doc.setTextColor(255, 255, 255);
doc.setFont("helvetica", "bold");
doc.setFontSize(22);

doc.text("DevOps Copilot AI", 105, 14, {
  align: "center",
});

doc.setFontSize(12);

doc.text("Incident Analysis Report", 105, 22, {
  align: "center",
});

y = 40;

// Reset text color

doc.setTextColor(0, 0, 0);

doc.setFontSize(11);

doc.setFont("helvetica", "bold");
doc.text("Incident ID:", 20, y);

doc.setFont("helvetica", "normal");
doc.text(incidentId, 60, y);

y += 8;

doc.setFont("helvetica", "bold");
doc.text("Generated On:", 20, y);

doc.setFont("helvetica", "normal");
doc.text(generatedOn, 60, y);

y += 8;

doc.setFont("helvetica", "bold");
doc.text("Technology:", 20, y);

doc.setFont("helvetica", "normal");
doc.text(analysis.logType, 60, y);

y += 8;

doc.setFont("helvetica", "bold");
doc.text("Confidence:", 20, y);

doc.setFont("helvetica", "normal");
doc.text(`${analysis.confidence}%`, 60, y);

y += 10;

doc.setFont("helvetica", "bold");
doc.text("Severity:", 20, y);

let badgeColor = [34, 197, 94];

if (analysis.severity === "Medium")
  badgeColor = [249, 115, 22];

if (
  analysis.severity === "High" ||
  analysis.severity === "Critical"
)
  badgeColor = [220, 38, 38];

  doc.setFillColor(...badgeColor);

doc.roundedRect(60, y - 6, 32, 8, 2, 2, "F");

doc.setTextColor(255, 255, 255);

doc.setFont("helvetica", "bold");

doc.text(
  analysis.severity.toUpperCase(),
  76,
  y,
  {
    align: "center",
  }
);

doc.setTextColor(0, 0, 0);

y += 15;

doc.setDrawColor(220);

doc.line(20, y, 190, y);

y += 10;

  const addSection = (title, content, isList = false) => {
  // Add new page if needed
  if (y > 250) {
    doc.addPage();
    y = 20;
  }

  // Section divider
  doc.setDrawColor(210);
  doc.line(20, y, 190, y);

  y += 8;

  // Section title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(title.toUpperCase(), 20, y);

  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  if (isList) {
    content
      .split("\n")
      .filter(line => line.trim())
      .forEach(line => {
        if (y > 275) {
          doc.addPage();
          y = 20;
        }

        const wrapped = doc.splitTextToSize(
          "• " + line.replace(/^- /, ""),
          165
        );

        doc.text(wrapped, 25, y);

        y += wrapped.length * 6 + 2;
      });
  } else {
    const wrapped = doc.splitTextToSize(
      content || "N/A",
      170
    );

    doc.text(wrapped, 20, y);

    y += wrapped.length * 6 + 8;
  }
};
  addSection(
  "Executive Summary",
  analysis.summary
);
  addSection(
    "Root Cause",
    analysis.rootCause,true
  );
  addSection(
    "Evidence",
    analysis.evidence,true
  );
  addSection(
    "Suggested Fix",
    analysis.fix,true
  );
  addSection(
    "Prevention",
    analysis.prevention,true
  );
  addSection(
    "AI Runbook",
    analysis.runbook,true
  );
  addSection(
    "Commands",
    analysis.commands,true
  );

  doc.save(
    `${analysis.logType}-incident-report.pdf`
  );
};
const copyCommand = async (command) => {
  try {
    await navigator.clipboard.writeText(command);

    setCopiedCommand(command);

    toast.success("Command copied!");

    setTimeout(() => {
      setCopiedCommand("");
    }, 2000);

  } catch (err) {
    toast.error("Failed to copy command.");
    console.error(err);
  }
};
  const handleDrag = (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (e.type === "dragenter" || e.type === "dragover") {
    setDragActive(true);
  } else if (e.type === "dragleave") {
    setDragActive(false);
  }
};

const handleDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();

  setDragActive(false);

  const droppedFile = e.dataTransfer.files[0];

  if (droppedFile) {
    setFile(droppedFile);
    setFileName(droppedFile.name);
    toast.success("Log file uploaded successfully!");
  }
};

  return (
    <div className="app">
    <Toaster
  position="top-right"
  toastOptions={{
    duration: 2500,
    style: {
      background: "#1e293b",
      color: "#fff",
      border: "1px solid #334155",
    },
  }}
/>

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

  <div
  className={`drop-zone ${dragActive ? "drag-active" : ""}`}
  onDragEnter={handleDrag}
  onDragLeave={handleDrag}
  onDragOver={handleDrag}
  onDrop={handleDrop}
>

  <div className="drop-icon">
  📤
  </div>

  <h3>Upload Your DevOps Logs</h3>

  <p>
  Drag & drop your log file here or browse your computer.
</p>

  <div className="supported-files">
    <span>.log</span>
    <span>.txt</span>
    <span>.out</span>
    <span>.yaml</span>
  </div>

  <input
  id="file-upload"
  type="file"
  accept=".log,.txt,.out,.yaml,.yml"
  onChange={handleFileChange}
  hidden
/>

<label
  htmlFor="file-upload"
  className="browse-btn"
>
  Browse Files
</label>

  {fileName && (
  <div className="selected-file">
    ✅ {fileName}
  </div>
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