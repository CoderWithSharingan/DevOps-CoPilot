import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
  "http://127.0.0.1:8000/upload",
  formData
);

console.log(response.data);

setResult(response.data.analysis);
    } catch (error) {
  console.log("ERROR:", error);
  console.log("RESPONSE:", error.response);
  console.log("DATA:", error.response?.data);

  alert("Upload failed");
}
  };

  return (
    <div>
      <h1>DevOps Copilot</h1>
      <p>AI-Powered Incident Analysis</p>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>
        Analyze Log
      </button>

      <br /><br />

      {result && (
        <div>
          <h2>Analysis</h2>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default App;