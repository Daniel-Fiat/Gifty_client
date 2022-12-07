import './SearchPage.css'
import { useState, useEffect } from 'react';
import ProductAPI from '../../services/product.service'
const Search = () => {
    localStorage.setItem("Navbar", true);
    const [products, setProducts] = useState([])

    useEffect(() => {
        ProductAPI.getAllproduct().then(products => {
            setProducts(products)
        })
    }, [])

    return (
        <>
            <h1>Search</h1>
            <input className='SearchInput'
                // onChange={updateUser}
                type='text'
                name='SearchInput'
                placeholder='Search'>
            </input>
            {
                products.map(product => <h1>{product.name}</h1>)
            }

        </>
    );

}

export default Search;