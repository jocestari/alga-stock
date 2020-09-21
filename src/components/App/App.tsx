import React, { useState } from 'react';
import Header from '../Header';
import Container from '../../shared/Container'
import './App.css';

function App() {
  const [street, setStreet] = useState() 
  return (
    <div className="App">
      <Header title='AlgaStock'/> 
      
      <Container>
       
      </Container>  
      
    </div>
  );
}

export default App;
