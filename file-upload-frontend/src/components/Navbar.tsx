import React, { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDataContext } from "./context/DataContext";
import jwtDecode from "jwt-decode";
import styles from "./Navbar.module.css";

const Navbar: FC = () => {
  const {
    isAuthenticated,
    setAuthenticated,
    setJwtToken,
    setShowToast,
    setToastContent,
  } = useDataContext();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      // Decode the JWT token to get its payload
      const decodedToken = jwtDecode<{ exp: number }>(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        // Token is not expired...
        setAuthenticated(true);
        setJwtToken(token);
        navigate("/home");
      } else {
        // Token is expired...
        setAuthenticated(false);
        setJwtToken(null);
        localStorage.removeItem("jwtToken");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate, setAuthenticated, setJwtToken]);

  const handleLogout = () => {
    setAuthenticated(false);
    setJwtToken(null);
    localStorage.removeItem("jwtToken");
    setToastContent("Successful Logout");
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
