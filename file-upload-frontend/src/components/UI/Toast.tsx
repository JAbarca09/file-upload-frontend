import React, { useState } from "react";
import styles from "./Toast.module.css";

type ToastProps = {
  content: string;
  showToast: boolean;
};

const Toast: React.FC<ToastProps> = ({ content, showToast }) => {
  const [removeToast, setRemoveToast] = useState<boolean>(false);

  return (
    <>
      {showToast && !removeToast && (
        <div className={`${styles.toast} ${styles["toast-active"]}`} id="toast">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className={styles.icon}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text">{content}</p>
          <button className={styles["close-button"]} onClick={() => setRemoveToast(true)}>
            &#10005;
          </button>
        </div>
      )}
    </>
  );
};

export default Toast;
