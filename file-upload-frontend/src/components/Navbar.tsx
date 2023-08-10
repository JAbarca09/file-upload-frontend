import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useDataContext } from "./context/DataContext";
import styles from "./Navbar.module.css";

const Navbar: FC = () => {
  const { isAuthenticated, setAuthenticated } = useDataContext();

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-content-wrapper"]}>
        <h1>FileFlow</h1>
        {isAuthenticated ? ( // Show logout button if authenticated
          <ul className={styles["navbar-list"]}>
            <li>
              <button className={styles.button} onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        ) : (
          <ul className={styles["navbar-list"]}>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
