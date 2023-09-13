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
  size: number;
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
  
  /**
   * https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
   * Format bytes as human-readable text.
   * 
   * @param bytes Number of bytes.
   * @param si True to use metric (SI) units, aka powers of 1000. False to use 
   *           binary (IEC), aka powers of 1024.
   * @param dp Number of decimal places to display.
   * 
   * @return Formatted string.
   */
  const humanFileSize = (
    bytes: number,
    si: boolean = true,
    dp: number = 1
  ): string => {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
      return bytes + " B";
    }

    const units = si
      ? ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    let u = -1;
    const r = 10 ** dp;

    do {
      bytes /= thresh;
      ++u;
    } while (
      Math.round(Math.abs(bytes) * r) / r >= thresh &&
      u < units.length - 1
    );

    return bytes.toFixed(dp) + " " + units[u];
  };

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
          <p>{humanFileSize(file.size)}</p>
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
