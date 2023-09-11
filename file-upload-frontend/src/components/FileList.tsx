import React from "react";
import styles from "./FileList.module.css";
import fileSvg from "../assets/images/file.svg";
import deleteSvg from "../assets/images/delete.svg";

export type FileProps = {
  _id: string;
  filename: string;
  file: {
    $binary: {
      base64: string;
      subType: string;
    };
  };
  user: {
    $oid: string;
  };
};

export type FilesListProps = {
  files: FileProps[];
  isLoading: boolean;
  onFileRemove: (fileId: string) => void;
  onFileDownload: (fileId: string, filename: string) => void;
};

const FileList: React.FC<FilesListProps> = ({
  files,
  isLoading,
  onFileRemove,
  onFileDownload,
}) => {
  const FilesJsx = files.map((file) => (
    <div className={styles["file-container"]} key={file._id}>
      <div className={styles["filename-svg"]}>
        <img className={styles.svg} src={fileSvg} alt="file icon" />
        <div className={styles["file-info"]}>
          <p
            className={styles.filename}
            onClick={() => onFileDownload(file._id, file.filename)}
          >
            {file.filename}
          </p>
          {/* TODO Show the fetched file size */}
          <p>10.0 MB</p>
        </div>
      </div>
      <div className={styles["file-delete"]}>
        <button
          className={styles["delete-button"]}
          aria-label={`Delete ${file.filename}`}
          onClick={() => onFileRemove(file._id)}
        >
          <span className={styles["visually-hidden"]}>Delete button</span>
          <img className={styles.svg} src={deleteSvg} alt="Trash bin" />
        </button>
      </div>
    </div>
  ));

  return (
    <div className={styles.filelist}>
      {files.length > 0 ? (
        FilesJsx
      ) : (
        <p className={styles["text-center"]}>You have no files saved!</p>
      )}
    </div>
  );
};

export default FileList;
