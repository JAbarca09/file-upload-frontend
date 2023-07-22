import React from "react";
import styles from "./FileList.module.css";

export type FileProps = {
  name: string;
  date: string;
};

export type FilesListProps = {
  files: FileProps[];
};

const FileList: React.FC<FilesListProps> = ({ files }) => {
  return (
    <div className={styles.filelist}>
      {files.map((file, index) => (
        <ul key={index}>
          <li>{file.name}</li>
          <li>{file.date}</li>
          <li>Delete Button</li>
        </ul>
      ))}
    </div>
  );
};

export default FileList;
