import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar: FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-content-wrapper"]}>
        <h1>FileFlow</h1>
        <ul className={styles["navbar-list"]}>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
