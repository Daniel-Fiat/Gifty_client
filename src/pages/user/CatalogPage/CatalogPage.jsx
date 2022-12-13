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
    localStorage.setItem("Navbar", true);

    useEffect(() => {
        ProductAPI.getCatalog(user._id).then(products => {
            setProducts(products)
        })
    }, [])

    return (
        <>
            <div className="menu-link"><Link to='/user/CreateProduct'>New Product</Link></div>
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
        </>
    );

}

export default Search;