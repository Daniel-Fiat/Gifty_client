import './WishListPage.css'
import { useState, useEffect, useContext } from 'react';
import ProductAPI from '../../../services/product.service'
//import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/auth.context';

const Search = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([])

    useEffect(() => {
        if (user) {
            ProductAPI.getWishList(user._id).then(products => {
                setProducts(products)
            })
        }
    }, [user])

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