import Axios from "axios";

const signUp = async (username: string, password: string) => {
  try {
    const response = await Axios.post("http://localhost:80/api/auth/signup", {
      username,
      password,
    });

    console.log(response);
  } catch (error) {
    console.error("Error occurred during signup:", error);
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
    console.error("Error occurred during login:", error);
    throw error;
  }
};

export { signUp, login };
