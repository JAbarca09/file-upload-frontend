import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BasicForm from "./components/BasicForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<BasicForm isSignUp={true} />}></Route>
          <Route path="/login" element={<BasicForm isSignUp={false} />}></Route>
        </Routes>
      </Router>
      <p>Welcome to FileFlow!</p>
    </div>
  );
}

export default App;
