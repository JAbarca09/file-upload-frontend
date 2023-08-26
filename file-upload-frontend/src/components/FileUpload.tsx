import React, { useState, useEffect } from "react";
import styles from "./FileUpload.module.css";
import FileList from "./FileList";
import { FileProps } from "./FileList";
import { uploadFile, getFiles } from "../Services/DataService";

const FileUpload: React.FC = () => {
  const [userFiles, setUserFiles] = useState<FileProps[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [filename, setFilename] = useState<string>(""); // not using this

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const files = await getFiles();

      setUserFiles(files);
      console.log("Fetched files:", files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    console.log(droppedFile);
    handleFile(droppedFile);
  };

  const handleFile = async (file: File) => {
    try {
      // Additional validation logic can be added here before proceeding to upload
      if (!file) {
        console.log("No file selected.");
        return;
      }

      const token = localStorage.getItem("jwtToken");

      if (!token) {
        console.log("Token not found. Please log in.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", file.name);

      await uploadFile(formData, token);
      fetchFiles();
    } catch (error) {
      console.error("Error handling file:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  return (
    <>
      <div className={styles["drop-container"]}>
        <div
          className={`${styles.dropArea} ${isDragging ? styles.dragging : ""}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <label htmlFor="fileInput" className={styles.fileInputLabel}>
            <span className={styles.chooseFileButton}>Choose File</span>
          </label>
          <input
            type="file"
            id="fileInput"
            className={styles.fileInput}
            onChange={handleChange}
          />
          <p className={styles["drop-area-text"]}>
            Drag and drop files here or click to browse
          </p>
          <p className={styles["drop-area-filename"]}>{filename}</p>
        </div>
      </div>
      <FileList files={userFiles} />
    </>
  );
};

export default FileUpload;
