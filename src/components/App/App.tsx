import React from 'react';
import Header from '../Header';
import Button from '../Button'
import './App.css';

function TestComponent () {

   return <img 
      width="15"
      src="https://img.icons8.com/pastel-glyph/2x/search--v2.png"
      alt="Search Icon"
    /> 

}

function App() {
  return (
    <div className="App">
      <Header title='AlgaStock'/> 
      <div className="Container">
        <Button 
          onClick={() => window.alert('Olá Marina!')}
          appendIcon={<TestComponent />}
        >
          Alert
          
        </Button>
      </div>
    </div>
  );
}

export default App;
