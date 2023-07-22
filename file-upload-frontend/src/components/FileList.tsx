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
      <ul>
        <li>Name</li>
        <li>Date</li>
        <li>Delete Button</li>
      </ul>
    </div>
  );
};

export default FileList;
