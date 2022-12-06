import './CatalogPage.css'
import { useState, useEffect } from 'react';
import ProductAPI from '../../../services/product.service'
import { Link } from 'react-router-dom';
const Search = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        ProductAPI.getCatalog('638e22c862962979876935a5').then(products => {
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
            <div className="menu-link"><Link to='/user/CreateProduct'>New Product</Link></div>
            {
                products.map(product => {
                    return (
                        <>
                            <h1>{product.name}</h1> <div><Link to={`/user/UpdateProduct/${product._id}`}>Edit</Link></div>
                        </>
                    )
                })
            }

        </>
    );

}

export default Search;