import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
   const [analysis, setAnalysis] = useState(null);
   const [fileName, setFileName] = useState("");
   const [file, setFile] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const handleFileChange = (e) => {
   const selectedFile = e.target.files[0];

  if (selectedFile) {
    setFile(selectedFile);
    setFileName(selectedFile.name);
  }
};
  
  const parseAnalysis = (text) => {
  return {
    rootCause:
      text.match(/Root Cause:\s*([\s\S]*?)Severity:/)?.[1]?.trim() || "",

    severity:
      text.match(/Severity:\s*([\s\S]*?)Suggested Fix:/)?.[1]?.trim() || "",

    fix:
      text.match(/Suggested Fix:\s*([\s\S]*?)Commands:/)?.[1]?.trim() || "",

    commands:
      text.match(/Commands:\s*([\s\S]*)/)?.[1]?.trim() || ""
  };
};

  const handleAnalyze = async () => {
  if (!file) {
    alert("Please select a file");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "http://127.0.0.1:8000/upload",
      formData
    );
    
    const parsed = parseAnalysis(
      response.data.analysis
    );

    setAnalysis(parsed);

  } catch (err) {
    setError("Failed to analyze log");
    console.error(err);
  } finally {
    setLoading(false);
  }
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
    disabled={loading}
  >
    {loading ? "Analyzing..." : "Analyze Log"}
  </button>

</div>
      {error && (
  <div className="analysis-card">
    <h3 className="card-title">
      Error
    </h3>

    <p>{error}</p>
  </div>
)}

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