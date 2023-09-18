import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BasicForm from "./components/BasicForm";
import { DataProvider } from "./components/context/DataContext";
import FileUpload from "./components/FileUpload";
import Toast from "./components/UI/Toast";
import "./App.css";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<BasicForm isSignUp={true} />} />
            <Route path="/login" element={<BasicForm isSignUp={false} />} />
            <Route path="/home" element={<FileUpload />} />
          </Routes>
        </Router>
      </div>
      <Toast />
    </DataProvider>
  );
}

export default App;
