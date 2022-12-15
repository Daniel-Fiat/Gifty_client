import './CatalogPage.css'
import { useState, useEffect, useContext } from 'react';
import ProductAPI from '../../../services/product.service'
import { Link } from 'react-router-dom';
import { Row } from "react-bootstrap";
import { AuthContext } from '../../../context/auth.context';
import CardCatalogList from '../../../components/CardCatalogList/CardCatalogList';

const Search = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([])

    useEffect(() => {
        ProductAPI.getCatalog(user._id).then(products => {
            setProducts(products)
        })
    }, [])

    return (
        <div id="catalog-page-container">
            <Row id="new-product-button-container">
                <Link id="new-product-button" to='/user/CreateProduct'>New Product</Link>
            </Row>
            <Row>
                {
                    products.map(product => {
                        return (
                            <>
                                <CardCatalogList key={product._id} id="card" product={product}>
                                </CardCatalogList>
                            </>
                        )
                    })
                }
            </Row>
        </div>
    );

}

export default Search;