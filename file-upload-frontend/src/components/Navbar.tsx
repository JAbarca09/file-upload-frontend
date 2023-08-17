import React, { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDataContext } from "./context/DataContext";
import styles from "./Navbar.module.css";

const Navbar: FC = () => {
  const { isAuthenticated, setAuthenticated, setJwtToken, setShowToast, setToastContent } = useDataContext();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if(token) {
      setAuthenticated(true);
      setJwtToken(token);
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [navigate, setAuthenticated, setJwtToken]);

  const handleLogout = () => {
    setAuthenticated(false);
    setJwtToken(null);
    localStorage.removeItem("jwtToken");
    setToastContent("Successful Logout")
    setShowToast(true);
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-content-wrapper"]}>
        <h1>FileFlow</h1>
        {isAuthenticated ? ( // Show logout button if authenticated
          <ul className={styles["navbar-list"]}>
            <li>
              <button className={styles.button} onClick={handleLogout}>
                Logout
              </button>
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
