import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import BasicForm from './components/BasicForm';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BasicForm />
      <p>Welcome to FileFlow!</p>
    </div>
  );
}

export default App;
