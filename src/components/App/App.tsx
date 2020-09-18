import React from 'react';
import logo from './logo.svg';
import './App.css';
import TestComponent from '../TestComponent'
import ClassComponet from '../ClassComponent'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <TestComponent name="Mundo!!!" />
        <ClassComponet name="James"/>
      </header>
    </div>
  );
}

export default App;
