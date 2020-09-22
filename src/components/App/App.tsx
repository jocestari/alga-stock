import React, { useState } from 'react';
import Header from '../Header';
import Container from '../../shared/Container'
import './App.css';
import Table, { TableHeader } from '../../shared/Table'
import Products from '../../shared/Table/Table.mockdata'
import Form from '../../shared/Form'
import Input from '../../shared/Input'
import Button from '../../shared/Button'

const headers: TableHeader[] = [
  { key: 'id', value:'#'},
  { key: 'name', value:'Product'},
  { key: 'price', value:'Price', right: true},
  { key: 'stock', value:'Available Stock', right: true}
]


function App() {
  const [street, setStreet] = useState() 
  return (
    <div className="App">
      <Header title='AlgaStock'/> 
      
      <Container>
        <Table 
          headers={headers}
          data={Products}
        />
        
        <Form title="Product form" onSubmit={console.log}>
            <Input 
              label="Name"
              placeholder="Eg.: Cookie"
            />
            <Input 
              label="Price"
              type="number"
              step="0.01"
              min="0"
              placeholder="Eg.: 1.25"
            />
            <Input 
              label="Stock"
              type="number"
              min="0"
              placeholder="Eg.: 15"
            />
            <Button>
              Submit
            </Button>
        </Form>
      </Container>  
      
    </div>
  );
}

export default App;
