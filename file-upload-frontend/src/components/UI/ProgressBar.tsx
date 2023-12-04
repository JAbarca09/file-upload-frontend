import React, { useState, useEffect } from "react";
import styles from "./ProgressBar.module.css";

type ProgressBarProps = {
  totalDataUsed: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ totalDataUsed }) => {
  const [dataPercentageUsed, setDataPercentageUsed] = useState<number>(0);

  // TODO When a file is added, the totalDataUsed needs to be updated and the progress bar
  // TODO When a file is removed, the totatlDataUsed need to be updated and the progress bar
  useEffect(() => {
    // set the dataPercentage used
    // set the bar to the corresponding percentage
    // 5242880 5MB, 2097152 2MB
    const usedPercentage = (totalDataUsed / 2097152) * 100;
    setDataPercentageUsed(usedPercentage);
  }, [totalDataUsed]);

  return (
    <div className={styles["progress-bar"]}>
      <div
        className={styles.progress}
        style={{ width: `${dataPercentageUsed}%` }}
      >
        <p className="">{`${dataPercentageUsed.toFixed(0)}%`}</p>
      </div>
    </div>
  );
};

export default ProgressBar;
