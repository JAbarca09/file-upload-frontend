import React from "react";
import styles from "./FileList.module.css";

const FileList: React.FC = () => {
    return (
        // name of file, date uploaded & delete button
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