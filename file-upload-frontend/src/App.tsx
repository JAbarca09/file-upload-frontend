import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import BasicForm from './components/BasicForm';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BasicForm isSignUp={true}/>
      <p>Welcome to FileFlow!</p>
    </div>
  );
}

export default App;
