import './WishListPage.css'
import { useState, useEffect, useContext } from 'react';
import ProductAPI from '../../../services/product.service'
//import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/auth.context';
import { Row } from 'react-bootstrap';
import CardProductSearchList from '../../../components/CardProductSearchList/CardProductSearchList';

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
            <h1 id="wish-list-title">Wish List</h1>
            {
                <Row>
                    {
                        products.map(product => <CardProductSearchList key={product._id} product={product}></CardProductSearchList>)
                    }
                </Row>

            }

        </>
    );

}

export default Search;