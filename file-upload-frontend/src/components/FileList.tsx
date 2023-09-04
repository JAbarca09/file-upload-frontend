import React from "react";
import LoadingScreen from "./UI/LoadingScreen";
import styles from "./FileList.module.css";

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
    <ul key={file._id}>
      <li className={styles["filename-svg"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          width="30px"
          height="30px"
        >
          <path
            d="M24.707,8.793l-6.5-6.5C18.019,2.105,17.765,2,17.5,2H7C5.895,2,5,2.895,5,4v22c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2 V9.5C25,9.235,24.895,8.981,24.707,8.793z M18,21h-8c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1 C19,20.552,18.552,21,18,21z M20,17H10c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1h10c0.552,0,1,0.448,1,1C21,16.552,20.552,17,20,17 z M18,10c-0.552,0-1-0.448-1-1V3.904L23.096,10H18z"
            fill="currentColor"
          />
        </svg>
        <p
          className={styles.filename}
          onClick={() => onFileDownload(file._id, file.filename)}
        >
          {file.filename}
        </p>
      </li>
      <li className={styles["file-delete"]}>
        <button
          className={styles["delete-button"]}
          aria-label={`Delete ${file.filename}`}
          onClick={() => onFileRemove(file._id)}
        >
          <span className={styles["visually-hidden"]}>Delete button</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="30px"
            height="30px"
          >
            <path
              d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"
              fill="currentColor"
            />
          </svg>
        </button>
      </li>
    </ul>
  ));

  return (
    <div className={styles.filelist}>
      {isLoading ? (
        <LoadingScreen />
      ) : files.length > 0 ? (
        FilesJsx
      ) : (
        <p>There are no files</p>
      )}
    </div>
  );
};

export default FileList;
