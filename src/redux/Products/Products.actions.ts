import { Action } from './Products.reducer'
import {Product} from '../../shared/Table/Table.mockdata'


export const insertNewProduct = (): Action<Product> => {
    return {
        type: 'INSERT_NEW_PRODUCT',
        payload: {
            _id: '1231djksa',
            name: 'Cookie',
            price: 0.35,
            stock: 700
        }
    }
}