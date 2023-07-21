import React, { useState } from "react";
import styles from "./FileUpload.module.css";

const FileUpload: React.FC = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [filename, setFilename] = useState<string>("");

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
    handleFiles(event.dataTransfer.files);
  };

  const handleFiles = (files: FileList) => {
    // Handle the files here (e.g., upload, validate, etc.)
    console.log(files);
    setFilename(files[0].name);
  };

  return (
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
        onChange={(event) => handleFiles(event.target.files!)}
      />
      <p className={styles["drop-area-text"]}>Drag and drop files here or click to browse</p>
      <p className={styles["drop-area-filename"]}>{filename}</p>
    </div>
    </div>
  );
};

export default FileUpload;
