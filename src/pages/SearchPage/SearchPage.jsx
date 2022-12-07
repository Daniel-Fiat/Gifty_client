import './SearchPage.css'
import { useState, useEffect } from 'react';
import ProductAPI from '../../services/product.service'
const Search = () => {
    localStorage.setItem("Navbar", true);
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState();


    useEffect(() => {
        ProductAPI.getAllproduct().then(products => {
            setProducts(products)
        })
    }, [])

    const filterProducts = (event) => {
        const { value } = event.target;
        let _products = [...products];

        _products = _products.filter((product) => product.name.toLowerCase().includes(value.toLowerCase()));

        value ? setFilter(_products) : setFilter(undefined)
    }

    return (
        <>
            <h1>Search</h1>
            <input className='SearchInput'
                onChange={filterProducts}
                type='text'
                name='SearchInput'
                placeholder='Search'>
            </input>
            {
                filter
                    ?
                    filter.map(filter => <h1>{filter.name}</h1>)
                    :
                    <div><h1>Hola</h1></div>
            }

        </>
    );
}

export default Search;