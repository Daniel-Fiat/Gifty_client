import './HomePage.css';
import { Row } from "react-bootstrap";
import ProductAPI from '../../services/product.service.js';

import navbarTopCenter from '../../assets/HomePage/top-navbar-center.png';
import navbarTopLeft from '../../assets/HomePage/top-navbar-left.png';
import navbarTopRightTop from '../../assets/HomePage/top-navbar-right-top.png';
import navbarTopRightBot from '../../assets/HomePage/top-navbar-right-bot.png';
import CardProductSearchList from '../../components/CardProductSearchList/CardProductSearchList';
import { useEffect, useState } from 'react';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductAPI.getTopSix().then(products => {
            setProducts(products)
        })
    }, [])

    return (
        <>
            <img id="navbar-top-center" src={navbarTopCenter} alt="NavbarTopCenter" />
            <img id="navbar-top-left" src={navbarTopLeft} alt="NavbarTopLeft" />
            <img id="navbar-top-right-top" src={navbarTopRightTop} alt="NavbarTopRightTop" />
            <img id="navbar-top-right-bot" src={navbarTopRightBot} alt="NavbarTopRightBot" />
            <div id="home-title-background">
                <h1 id="home-title">Gifty</h1>
            </div>
            <div id="home-featured">
                <Row>
                    <h2 id='title-featured'>Featured</h2>
                    {
                        products?.map(product => <CardProductSearchList key={product._id} product={product}></CardProductSearchList>)
                    }
                </Row>
            </div>
        </>
    );

}

export default Home;