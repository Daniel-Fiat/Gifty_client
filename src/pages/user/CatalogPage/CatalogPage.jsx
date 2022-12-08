import './CatalogPage.css'
import { useState, useEffect, useContext } from 'react';
import ProductAPI from '../../../services/product.service'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/auth.context';
import CardProductSearchList from '../../../components/CardProductSearchList/CardProductSearchList';

const Search = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([])
    localStorage.setItem("Navbar", true);

    useEffect(() => {
        ProductAPI.getCatalog(user._id).then(products => {
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
                            <CardProductSearchList id="card" product={product}>
                            </CardProductSearchList>
                            <Link to={`/user/UpdateProduct/${product._id}`}>
                                edit
                            </Link>
                        </>
                    )
                })
            }

        </>
    );

}

export default Search;