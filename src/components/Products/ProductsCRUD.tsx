import React, { useEffect, useState } from 'react'
import Table, { TableHeader } from '../../shared/Table'
import { Product } from '../../shared/Table/Table.mockdata'
import ProductForm, { ProductCreator } from './ProductForm'
import Swal from 'sweetalert2'
import { connect, useDispatch } from 'react-redux'
import * as ProductsAction from '../../redux/Products/Products.actions'
import { RootState } from '../../redux'

const headers: TableHeader[] = [
    { key: 'id', value:'#'},
    { key: 'name', value:'Product'},
    { key: 'price', value:'Price', right: true},
    { key: 'stock', value:'Available Stock', right: true}
  ]

declare interface ProductsCRUDProps {
    products: Product[]
}

const ProductsCRUD: React.FC<ProductsCRUDProps> = (props) => {
    const dispatch = useDispatch()
    const [updatingProduct, setUpdatingProduct] = useState<Product | undefined>(undefined)
    //const [products, setProducts] = useState<Product[]>([])

async function fetchData() {
    try{
        await dispatch(ProductsAction.getProducts())
        
    } catch(err){
        Swal.fire('Oops!',err.message,'error')
    }

}

useEffect(() => {
    fetchData()
}, [])

//getAllProducts().then(console.log)

const handleProductSubmit = async (product: ProductCreator) => {
try {
    dispatch(ProductsAction.insertNewProduct(product))
} catch (err) {
    Swal.fire('Oops!', err.message, 'error')
}
}

const handleProductUpdate = async (newProduct: Product) => {
try {
    await dispatch(ProductsAction.updateProduct(newProduct))
    setUpdatingProduct(undefined)
} catch(err) {
    Swal.fire('Oops!', err.message, 'error')
}


}

const deleteProduct = async (id:string) => {
try {
    await dispatch(ProductsAction.deleteProduct(id))
    Swal.fire('Uhul!!', 'Product sucessfully deleted', 'success')
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

return <>
    <Table 
        headers={headers}
        data={props.products}
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
    </>
}

const mapStateToProps = (state: RootState) => ({
    products: state.products
})

export default connect(mapStateToProps)(ProductsCRUD)