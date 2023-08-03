import React, { useState } from "react";
import useInput from "../hooks/use-input";
import styles from "./BasicForm.module.css";
import { signUp, login } from "../Services/DataService";

type BasicFormProps = {
  isSignUp: boolean;
};

const BasicForm: React.FC<BasicFormProps> = ({ isSignUp }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [signUpError, setSignUpError] = useState<string>("");

  // Username Input
  const {
    value: enteredUsername,
    isValid: usernameIsValid,
    hasError: enteredUsernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameInputBlurHandler,
    reset: resetUsername,
  } = useInput((value) => value.trim() !== "");

  // Password Input
  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value.trim() !== "");

  let formIsValid: boolean = false;
  if (usernameIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // If the form is valid then reset all the values
    if (!formIsValid) {
      return;
    }
    console.log("Submitted!");
    console.log(enteredUsername, enteredPassword);

    if (isSignUp) {
      (async () => {
        const result = await signUp(enteredUsername, enteredPassword);
        console.log(`This is the result: ${result}`);
        if (result) {
          setSignUpError("");
        } else {
          setSignUpError(
            "An error occurred during sign up. Please try again later."
          );
        }
      })();
    } else {
      (async () => {
        try {
          const result = await login(enteredUsername, enteredPassword);
          console.log(`This is the result: ${result}`);
          if (!result) {
            setLoginError("Invalid Credentials");
          } else {
            setLoginError("");
          }
        } catch (error) {
          setLoginError(
            "An error occurred during login. Please try again later."
          );
        }
      })();
    }

    resetUsername();
    resetPassword();
  };

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className={styles.container}>
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
        <label htmlFor="username">Username</label>
        <input
          className={styles["basic-form-input"]}
          type="text"
          id="username"
          onChange={usernameChangeHandler}
          onBlur={usernameInputBlurHandler}
          value={enteredUsername}
        />
        {enteredUsernameHasError && (
          <p className={styles["error-text"]}>Your username is not valid</p>
        )}
        <label htmlFor="password">Password</label>
        <input
          className={styles["basic-form-input"]}
          type={showPassword ? "text" : "password"}
          id="password"
          onChange={passwordChangeHandler}
          onBlur={passwordInputBlurHandler}
          value={enteredPassword}
        />
        {passwordHasError && (
          <p className={styles["error-text"]}>Your password is not valid</p>
        )}
        <label className={styles["show-password-label"]}>
          <input
            className={styles["show-password"]}
            type="checkbox"
            checked={showPassword}
            onChange={toggleShowPassword}
          />
          Show Password
        </label>
        {/* FIXME set disabled and enabled state for button */}
        <button
          className={styles["form-submit-button"]}
          disabled={!formIsValid}
        >
          Submit
        </button>
        <p>{isSignUp ? signUpError : loginError}</p>
      </div>
    </form>
  );
};

export default BasicForm;
