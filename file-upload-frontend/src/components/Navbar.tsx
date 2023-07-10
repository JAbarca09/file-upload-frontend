import React, { FC } from "react";
import styles from "./Navbar.module.css";

const Navbar: FC = () => {
  return (
    <nav className={styles.navbar}>
      <h1>File Flow</h1>
      <ul className={styles["navbar-list"]}>
        <li>
          <button>Login</button>
        </li>
        <li>
          <button>Sign Up</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
