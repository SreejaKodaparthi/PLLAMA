import React, { useState } from "react";

export default function YOLO() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle image selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Upload image and get predictions
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();
      setDetections(data.detections);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Check your backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>YOLO Object Detection</h2>

      {/* File Upload */}
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          marginLeft: "1rem",
          padding: "0.5rem 1rem",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {loading ? "Detecting..." : "Upload & Detect"}
      </button>

      {/* Image Preview */}
      {preview && (
        <div style={{ marginTop: "1.5rem" }}>
          <h3>Preview:</h3>
          <img
            src={preview}
            alt="preview"
            style={{ width: "400px", borderRadius: "8px", marginTop: "10px" }}
          />
        </div>
      )}

      {/* Detection Results */}
      {detections.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Detections:</h3>
          <ul>
            {detections.map((det, index) => (
              <li key={index}>
                {det.class} ({(det.confidence * 100).toFixed(2)}%)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
