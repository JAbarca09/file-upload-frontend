import Axios, { AxiosError } from "axios";
import config from "./config";
// ----------------------------Authentication----------------------------
const signUp = async (username: string, password: string) => {
  try {
    const response = await Axios.post(`${config.apiUrl}${config.apiSignUp}`, {
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
    const response = await Axios.post(`${config.apiUrl}${config.apiLogin}`, {
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
      `${config.apiUrl}${config.apiFileUpload}`,
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

    const response = await Axios.get(`${config.apiUrl}${config.apiGetFiles}`, {
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

const getFile = async (fileId: string) => {
  try {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.log("Token not found. Please log in.");
      return;
    }
    const response = await Axios.get(`${config.apiUrl}${config.apiGetFile}${fileId}`, {
      headers: {
        Authorization: token,
      },
    });

    if (response.status === 200) {
      const file = response.data;
      return file;
    } else {
      throw new Error("Error occured while retrieving the file: " + response.status);
    }
  } catch (error) {
    console.error("Error occurred while fetching a file:", error);
  }
}

const downloadFile = async (fileId: string, filename: string) => {
  try {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.log("Token not found. Please log in.");
      return;
    }

    const response = await Axios.get(
      `${config.apiUrl}${config.apiDownloadFile}${fileId}`,
      {
        headers: {
          Authorization: token,
        },
        responseType: "blob",
      }
    );

    if (response.status === 200) {
      const blob = new Blob([response.data]);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } else {
      throw new Error("Error downloading file with status: " + response.status);
    }
  } catch (error) {
    console.error("Error occurred while downloading file:", error);
    throw new Error(
      "An error occurred while downloading file. Please try again later."
    );
  }
};

const removeFile = async (fileId: string) => {
  try {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.log("Token not found. Please log in.");
      return;
    }

    const response = await Axios.delete(
      `${config.apiUrl}${config.apiRemoveFile}${fileId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.status === 204) {
      console.log("File removed successfully");
    } else {
      throw new Error("Error removing file with status: " + response.status);
    }
  } catch (error) {
    console.error("Error occurred while removing file:", error);
    throw new Error(
      "An error occurred while removing file. Please try again later."
    );
  }
};

export { signUp, login, uploadFile, getFiles, getFile, downloadFile, removeFile };
