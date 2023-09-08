import React, { FC, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDataContext } from "./context/DataContext";
import LoadingScreen from "./UI/LoadingScreen";
import jwtDecode from "jwt-decode";
import styles from "./Navbar.module.css";

const Navbar: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    isAuthenticated,
    setAuthenticated,
    setJwtToken,
    setShowToast,
    setToastContent,
  } = useDataContext();

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
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
        setToastContent("Session expired. Please log in again.");
        setShowToast(true);
        navigate("/login");
      }
    }
    setIsLoading(false);
  }, [navigate, setAuthenticated, setJwtToken, setShowToast, setToastContent]);

  const handleLogout = () => {
    setAuthenticated(false);
    setJwtToken(null);
    localStorage.removeItem("jwtToken");
    setToastContent("Successful logout.");
    setShowToast(true);
    navigate("/login");
  };

  return (
    <nav className={styles["navbar-content-wrapper"]}>
      {isLoading ? <LoadingScreen/> : isAuthenticated ? (
        <>
          <h1>FileFlow</h1>
          <ul className={styles["navbar-list"]}>
            <li>
              <button className={styles.button} onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </>
      ) : (
        <>
          <h1>FileFlow</h1>
          <ul className={styles["navbar-list"]}>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default Navbar;
