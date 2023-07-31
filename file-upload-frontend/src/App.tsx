import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BasicForm from "./components/BasicForm";
import FileList from "./components/FileList";
import { FileProps } from "./components/FileList";
import "./App.css";

const files: FileProps[] = [ // Use the FileProps type for the 'files' array
  { name: "file1.txt"},
  { name: "file2.png"},
  // Add more objects here...
];

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<BasicForm isSignUp={true} />} />
          <Route path="/login" element={<BasicForm isSignUp={false} />} />
        </Routes>
      </Router>
      <FileList files={files} />
      <p>Welcome to FileFlow!</p>
    </div>
  );
}

export default App;
