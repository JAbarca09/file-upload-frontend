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

    console.log(response);
    // console.log(response.data.token);
  } catch (error) {
    console.error("Error occurred during signup:", error);
  }
};

export { signUp, login };
