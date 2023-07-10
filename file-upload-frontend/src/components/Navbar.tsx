import React, { FC } from "react";
import styles from "./Navbar.module.css";

const Navbar: FC = () => {
  return (
    <nav className={styles.navbar}>
      <h1>FileFlow</h1>
      <ul className={styles["navbar-list"]}>
        <li>
          <a href="#">Login</a>
        </li>
        <li>
          <a href="#">Sign Up</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
