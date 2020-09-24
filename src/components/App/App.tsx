import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import Header from '../Header';
import Container from '../../shared/Container'
import './App.css';
import Table, { TableHeader } from '../../shared/Table'
import {Product} from '../../shared/Table/Table.mockdata'
import ProductForm, { ProductCreator } from '../Products/ProductForm'
import { createSingleProduct, deleteSingleProduct, getAllProducts, updateSingleProduct } from '../../services/Products.Service'

const headers: TableHeader[] = [
  { key: 'id', value:'#'},
  { key: 'name', value:'Product'},
  { key: 'price', value:'Price', right: true},
  { key: 'stock', value:'Available Stock', right: true}
]


function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [updatingProduct, setUpdatingProduct] = useState<Product | undefined>(undefined)
  
  async function fetchData() {
    const _products = await getAllProducts()
    setProducts(_products)
  }

  useEffect(() => {
     fetchData()
  }, [])

  getAllProducts().then(console.log)

  const handleProductSubmit = async (product: ProductCreator) => {
    try {
        await createSingleProduct(product)
        fetchData()
    } catch (err) {
        Swal.fire('Oops!', err.message, 'error')
    }
  }

  const handleProductUpdate = async (newProduct: Product) => {
    try {
      await updateSingleProduct(newProduct)
      setUpdatingProduct(undefined)
      fetchData()
    } catch(err) {
       Swal.fire('Oops!', err.message, 'error')
    }
  
    
  }

  const deleteProduct = async (id:string) => {
    try {
      await deleteSingleProduct(id)
      Swal.fire('Uhul!!', 'Product sucessfully deleted', 'success')
      fetchData()
      setUpdatingProduct(undefined) //clean the form after delete
    } catch(err){
        Swal.fire('Oops!', err.message, 'error')
    }
  }

  const handleProductDelete = (product: Product) => {
    Swal
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#09f',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, delete ${product.name}!`
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteProduct(product._id)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
  }

  const handleProductEdit = ( product: Product ) => {
      setUpdatingProduct(product)
  }

  const handleProductDetail = ( product: Product ) => {
    Swal.fire(
      'Product Details',
      `${product.name} costs $${product.price} and we have ${product.stock} available in stock.`,
      'info'
    )

  }

 
  return (
    <div className="App">
      <Header title='AlgaStock'/> 
      
      <Container>
        <Table 
          headers={headers}
          data={products}
          enableActions={true}
          onDelete={handleProductDelete}
          onDetail={handleProductDetail}
          onEdit={handleProductEdit}
        />
        
        <ProductForm 
          form = { updatingProduct }
          onSubmit={handleProductSubmit}
          onUpdate={handleProductUpdate}
        />

      </Container>  
      
    </div>
  );
}

export default App;
