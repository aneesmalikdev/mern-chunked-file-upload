// ChunkedUpload.jsx
import React, { useState } from "react";
import axios from "axios";

// Define chunk size (1MB)
const CHUNK_SIZE = 1024 * 1024 * 1;

const ChunkedUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadChunk = async (
    file,
    start,
    end,
    chunkIndex,
    totalChunks,
    fileId
  ) => {
    const chunk = file.slice(start, end);
    const formData = new FormData();
    formData.append("fileId", fileId);
    formData.append("chunkIndex", chunkIndex);
    formData.append("totalChunks", totalChunks);
    formData.append("fileName", file.name);
    formData.append("chunk", chunk);
    console.log(
      `Sending chunk ${chunkIndex + 1} of ${totalChunks} for file ${file.name}`
    );
    return axios.post("/upload-chunk", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // Handle the overall upload process
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    // Generate a unique file identifier
    const fileId = `${Date.now()}-${Math.random()}`;
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let currentChunk = 0;

    // Sequentially upload each chunk
    while (currentChunk < totalChunks) {
      const start = currentChunk * CHUNK_SIZE;
      const end = Math.min(file.size, start + CHUNK_SIZE);

      try {
        await uploadChunk(file, start, end, currentChunk, totalChunks, fileId);
        currentChunk++;
        setUploadProgress(Math.round((currentChunk / totalChunks) * 100));
      } catch (error) {
        console.error("Error uploading chunk", currentChunk, error);
        setMessage("Error uploading file.");
        return;
      }
    }

    setMessage("File uploaded successfully!");
  };

  return (
    <div>
      <h2>Chunked File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadProgress > 0 && <p>Progress: {uploadProgress}%</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChunkedUpload;
