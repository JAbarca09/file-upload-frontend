import React, { useState } from "react";
import styles from "./Toast.module.css";

type ToastProps = {
  content: string;
  showToast: boolean;
};

const Toast: React.FC<ToastProps> = ({ content, showToast }) => {
  const [removeToast, setRemoveToast] = useState<boolean>(false);

  // const informationSVG = (
  //   <svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     fill="none"
  //     className={styles.icon}
  //     viewBox="0 0 24 24"
  //     stroke="currentColor"
  //   >
  //     <path
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //       strokeWidth={2}
  //       d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  //     />
  //   </svg>
  // );

  const successSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={styles.icon}
      viewBox="0 0 50 50"
      width="50px"
      height="50px"
      stroke="currentColor"
    >
      <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 34.988281 14.988281 A 1.0001 1.0001 0 0 0 34.171875 15.439453 L 23.970703 30.476562 L 16.679688 23.710938 A 1.0001 1.0001 0 1 0 15.320312 25.177734 L 24.316406 33.525391 L 35.828125 16.560547 A 1.0001 1.0001 0 0 0 34.988281 14.988281 z" />
    </svg>
  );

  return (
    <>
      {showToast && !removeToast && (
        <div className={`${styles.toast} ${styles["toast-active"]}`} id="toast">
          {successSVG}
          <p className="text">{content}</p>
          <button
            className={styles["close-button"]}
            onClick={() => setRemoveToast(true)}
          >
            &#10005;
          </button>
        </div>
      )}
    </>
  );
};

export default Toast;
