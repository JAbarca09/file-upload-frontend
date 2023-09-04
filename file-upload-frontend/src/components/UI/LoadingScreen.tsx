import React from "react";
import styles from "./LoadingScreen.module.css";

const LoadingScreen: React.FC = () => {
  return (
    <div className={styles["loading-screen"]}>
      <div className={styles.spinner}></div>
      <p className={styles["visually-hidden"]}>Loading...</p>
    </div>
  );
};

export default LoadingScreen;
