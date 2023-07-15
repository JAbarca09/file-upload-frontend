import React, { useState } from "react";
import useInput from "../hooks/use-input";
import styles from "./BasicForm.module.css";

const BasicForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false); 

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

    resetUsername();
    resetPassword();
  };

  const toggleShowPassword = (event: React.MouseEvent | React.TouchEvent) => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className={styles.container}>
        <label htmlFor="username">Username</label>
        <input
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
          type={showPassword ? "text" : "password"}
          id="password"
          onChange={passwordChangeHandler}
          onBlur={passwordInputBlurHandler}
          value={enteredPassword}
        />
        <input className={styles["show-password"]} type="checkbox" onClick={toggleShowPassword}/>Show Password

        {passwordHasError && (
          <p className={styles["error-text"]}>Your password is not valid</p>
        )}
        {/* FIXME set disabled and enabled state for button */}
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
