import './WishListPage.css'
import { useState, useEffect } from 'react';
import ProductAPI from '../../../services/product.service'
//import { Link } from 'react-router-dom';
const Search = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        ProductAPI.getWishList('638e227162962979876935a2').then(products => {
            setProducts(products)
        })
    }, [])

    return (
        <>
            <h1>Search</h1>
            <input className='CatalogInput'
                // onChange={updateUser}
                type='text'
                name='SearchInput'
                placeholder='Search'>
            </input>
            {
                products.map(product => {
                    return (
                        <>
                            <h1>{product.name}</h1>
                        </>
                    )
                })
            }

        </>
    );

}

export default Search;