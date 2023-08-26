import Axios, { AxiosError } from "axios";
// ----------------------------Authentication----------------------------
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
      throw new Error("Sign up failed with status: " + response.status);
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 400) {
      throw new Error(
        "Invalid input. Please check your username and password."
      );
    } else if (axiosError.response && axiosError.response.status === 409) {
      throw new Error(
        "Username already exists. Please choose a different username."
      );
    } else {
      console.error("Error occurred during signup:", error);
      throw new Error(
        "An error occurred during sign up. Please try again later."
      );
    }
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
      const token = data.token;
      localStorage.setItem("jwtToken", token);
      return data.token; // Return token if login was successful
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

// ----------------------------File Logic----------------------------
const uploadFile = async (formData: FormData, token: string) => {
  try {
    const response = await Axios.post(
      "http://localhost:80/api/file/upload",
      formData,
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 201) {
      console.log("File uploaded successfully:", response.data);
      return true;
    } else {
      throw new Error("File upload failed with status: " + response.status);
    }
  } catch (error) {
    console.error("Error occurred during file upload:", error);
    throw new Error(
      "An error occurred during file upload. Please try again later."
    );
  }
};

const getFiles = async () => {
  try {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.log("Token not found. Please log in.");
      return;
    }

    const response = await Axios.get("http://localhost:80/api/file/get-files", {
      headers: {
        Authorization: token,
      },
    });

    if (response.status === 200) {
      const files = response.data;
      return files; // Return the retrieved files
    } else {
      throw new Error("Error retrieving files with status: " + response.status);
    }
  } catch (error) {
    console.error("Error occurred while retrieving files:", error);
    throw new Error(
      "An error occurred while retrieving files. Please try again later."
    );
  }
};

export { signUp, login, uploadFile, getFiles };
