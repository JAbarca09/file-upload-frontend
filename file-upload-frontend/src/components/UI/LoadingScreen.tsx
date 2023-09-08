import React from "react";
import styles from "./LoadingScreen.module.css";

type LoadingScreenProps = {
  color: string;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ color }) => {
  const spinnerClassName = `spinner-${color}`

  return (
    <div className={styles["loading-screen"]}>
      <div className={styles[spinnerClassName]}></div>
      <p className={styles["visually-hidden"]}>Loading...</p>
    </div>
  );
};

export default LoadingScreen;
