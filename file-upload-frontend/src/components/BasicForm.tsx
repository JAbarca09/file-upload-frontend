import React from "react";
import useInput from "../hooks/use-input";

const BasicForm: React.FC = () => {
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

  return (
    <form onSubmit={onFormSubmit}>
      <div className="control-group">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={usernameChangeHandler}
            onBlur={usernameInputBlurHandler}
            value={enteredUsername}
          />
          {enteredUsernameHasError && (
            <p className="error-text">Your username is not valid</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={passwordChangeHandler}
            onBlur={passwordInputBlurHandler}
            value={enteredPassword}
          />
          {passwordHasError && (
            <p className="error-text">Your password is not valid</p>
          )}
        </div>
      </div>
      <div className="form-actions">
        {/* FIXME set disabled and enabled state for button */}
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;