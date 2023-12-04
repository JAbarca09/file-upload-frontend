import React, { useState, useEffect } from "react";
import styles from "./FileUpload.module.css";
import FileList from "./FileList";
import LoadingScreen from "./UI/LoadingScreen";
import ProgressBar from "./UI/ProgressBar";
import { FileProps } from "./FileList";
import { useDataContext } from "./context/DataContext";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import {
  uploadFile,
  getFiles,
  downloadFile,
  removeFile,
} from "../Services/DataService";

type CheckTokenResult = {
  validToken: boolean;
  token: string | null;
};

const FileUpload: React.FC = () => {
  const [usedFileStorage, setUsedFileStorage] = useState<number>(0);
  const [userFiles, setUserFiles] = useState<FileProps[] | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorLoadingFiles, setErrorLoadingFiles] = useState<boolean>(false);

  const { setAuthenticated, setJwtToken, setShowToast, setToastContent } =
    useDataContext();
  const navigate = useNavigate();

  useEffect(() => {
    initialFileLoad();
  }, []);

  const checkTokenAndRedirect = (): CheckTokenResult => {
    const token = localStorage.getItem("jwtToken");
    let validToken = false;
    if (token) {
      const decodedToken = jwtDecode<{ exp: number }>(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        validToken = true;
      } else {
        handleExpiredToken();
      }
    } else {
      navigate("/login");
    }
    return { validToken, token };
  };

  const handleExpiredToken = () => {
    setAuthenticated(false);
    setJwtToken(null);
    localStorage.removeItem("jwtToken");
    setToastContent("Session expired. Please log in again.");
    setShowToast(true);
    navigate("/login");
  };

  const fetchFiles = async () => {
    try {
      const files = await getFiles();

      setUserFiles(files);
      console.log("Fetched files:", files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  async function initialFileLoad() {
    try {
      setIsLoading(true);
      const files = await getFiles();
      setUserFiles(files);
      setIsLoading(false);
      console.log("Fetched files:", files);
      // get the total file storage and 
      const totalFileStorage: number = files.reduce((totalSize: number, file: File) => {
        return totalSize + file.size;
      }, 0);
      setUsedFileStorage(totalFileStorage);
  
      console.log("Total File Storage:", totalFileStorage);

    } catch (error) {
      setIsLoading(false);
      setToastContent("File retrieval failed. Please try again later.");
      setErrorLoadingFiles(true);
      setShowToast(true);
      console.error("Error fetching files:", error);
    }
  }

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
      const { validToken, token } = checkTokenAndRedirect();

      if (!validToken) {
        return;
      }

      if (!file) {
        console.log("No file selected.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", file.name);

      await uploadFile(formData, token!);
      fetchFiles();
      setToastContent("File upload successful.");
      setShowToast(true);
    } catch (error) {
      setToastContent("Error uploading file. Please try again later.");
      setShowToast(true);
      console.error("Error handling file:", error);
    }
  };

  const handleFileRemoval = async (fileId: string) => {
    try {
      const { validToken } = checkTokenAndRedirect();

      if (!validToken) {
        return;
      }

      await removeFile(fileId);
      fetchFiles();
      setToastContent("Removed file successfully.");
      setShowToast(true);
    } catch (error) {
      console.log("Error removing file:", error);
    }
  };

  const handleFileDownload = async (fileId: string, filename: string) => {
    const { validToken } = checkTokenAndRedirect();

    if (!validToken) {
      return;
    }

    try {
      await downloadFile(fileId, filename);
    } catch (error) {
      console.log("Error downloading file:", error);
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
      <ProgressBar totalDataUsed={usedFileStorage} />
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
        </div>
      </div>
      {errorLoadingFiles ? (
        <p className={styles["error-fetch"]}>
          There was an error fetching files.
        </p>
      ) : userFiles !== null ? (
        <FileList
          files={userFiles || []}
          onFileRemove={handleFileRemoval}
          onFileDownload={handleFileDownload}
          isLoading={isLoading}
        />
      ) : (
        <LoadingScreen color="red" />
      )}
    </>
  );
};

export default FileUpload;
