import './HomePage.css';
import { Carousel, Row } from "react-bootstrap";
import ProductAPI from '../../services/product.service.js';
import Desayunos from '../../assets/CategoryImages/Desayunos.png';
import Picadas from '../../assets/CategoryImages/Picadas.png';
import Pasteleria from '../../assets/CategoryImages/Pasteleria.png';

import navbarTopCenter from '../../assets/HomePage/top-navbar-center.png';
import navbarTopLeft from '../../assets/HomePage/top-navbar-left.png';
import navbarTopRightTop from '../../assets/HomePage/top-navbar-right-top.png';
import navbarTopRightBot from '../../assets/HomePage/top-navbar-right-bot.png';
import CardProductSearchList from '../../components/CardProductSearchList/CardProductSearchList';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductAPI.getTopSix().then(products => {
            setProducts(products)
        })
    }, [])

    return (
        <>
            <img id="navbar-top-left" src={navbarTopLeft} alt="NavbarTopLeft" />
            <img id="navbar-top-right-top" src={navbarTopRightTop} alt="NavbarTopRightTop" />
            <img id="navbar-top-right-bot" src={navbarTopRightBot} alt="NavbarTopRightBot" />
            <div id="home-title-background">
                <h1 id="home-title">Gifty</h1>
            </div>
            <img id="navbar-top-center" src={navbarTopCenter} alt="NavbarTopCenter" />
            <div id="home-featured">
                <h2 id='title-featured'>discounts</h2>
                <Carousel id="Carousel">
                    <Carousel.Item interval={2500}>
                        <Link to="/search/category-breakfast">
                            <img
                                className="d-block w-100"
                                src={Desayunos}
                                alt="First slide"
                            />
                        </Link>
                        <Carousel.Caption>
                            <h3>Breakfast</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={2500}>
                        <Link to="/search/category-cakes">
                            <img
                                className="d-block w-100"
                                src={Pasteleria}
                                alt="First slide"
                            />
                        </Link>
                        <Carousel.Caption>
                            <h3>Cakes</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={2500}>
                        <Link to="/search/category-cakes">
                            <img
                                className="d-block w-100"
                                src={Picadas}
                                alt="First slide"
                            />
                        </Link>
                        <Carousel.Caption>
                            <h3>Tapas</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
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