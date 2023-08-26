import React, { useState, useEffect } from "react";
import FileUpload from "./FileUpload";
import FileList from "./FileList";
import { FileProps } from "./FileList";
import { getFiles } from "../Services/DataService";

const Homepage: React.FC = () => {
  const [userFiles, setUserFiles] = useState<FileProps[]>([]);

  useEffect(() => {
    console.log("I ran");
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
  return (
    <>
      <FileUpload />
      <FileList files={userFiles} />
    </>
  );
};

export default Homepage;
