import React from "react";
import FileUpload from "./FileUpload";
import FileList from "./FileList";
import { FileProps } from "./FileList";

const files: FileProps[] = [
  // Use the FileProps type for the 'files' array
  { name: "file1.txt" },
  { name: "file2.png" },
  // Add more objects here...
];

const Homepage: React.FC = () => {
  return (
    <>
      <FileUpload />
      <FileList files={files} />
    </>
  );
};

export default Homepage;
