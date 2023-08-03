import Axios, { AxiosError } from "axios";

const signUp = async (username: string, password: string) => {
  try {
    const response = await Axios.post("http://localhost:80/api/auth/signup", {
      username,
      password,
    });

    console.log(response);

    if (response.status === 201) {
      const data = response.data;
      console.log("Sign up successful:", data);
      return true;
    } else {
      throw new Error("Sign up failed");
    }
  } catch (error) {
    console.error("Error occurred during signup:", error);
    return false;
  }
};

const login = async (username: string, password: string) => {
  try {
    const response = await Axios.post("http://localhost:80/api/auth/login", {
      username,
      password,
    });

    if (response.status === 200) {
      const data = response.data;
      console.log("Login successful:", data);
      return true; // Return true if login was successful
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    // Cast the error to AxiosError to access the response property
    const axiosError = error as AxiosError;

    if (axiosError.response && axiosError.response.status === 401) {
      throw new Error("Invalid credentials");
    } else {
      console.error("Error occurred during login:", error);
      throw new Error(
        "An error occurred during login. Please try again later."
      );
    }
  }
};

export { signUp, login };
