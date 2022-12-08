import './CategoryChancePage.css';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Modal, Button } from 'react-bootstrap';

import ProductAPI from '../../services/product.service';
import CardProductSearchList from '../../components/CardProductSearchList/CardProductSearchList';
import capitalize from '../../utils/capitalize';
import filterIcon from '../../assets/filter-icon.png';
import orderIcon from '../../assets/order-icon.png';

const CategoryChance = () => {
    localStorage.setItem("Navbar", true);
    const { type } = useParams();
    const typeApi = type.split("-")[0];
    const typeBody = type.split("-")[1];

    const [filter, setFilter] = useState();

    const [showOrder, setShowOrder] = useState(false);
    const orderClose = () => setShowOrder(false);

    const orderShow = () => {
        setShowOrder(true)
    };

    useEffect(() => {
        if (typeApi === "category") {
            ProductAPI.getProductsByCategory(typeBody).then(products => {
                setFilter(products)
            })
        } else if (typeApi === "chance") {
            ProductAPI.getProductsBychance(typeBody).then(products => {
                setFilter(products)
            })
        }
    }, [])

    const filterProducts = (event) => {
        const { value } = event.target;
        let _products = [...filter];

        _products = _products.filter((product) => product.name.toLowerCase().includes(value.toLowerCase()));

        setFilter(_products)
    }

    const orderProducts = (event) => {
        const { value } = event.target;
        let _products = [...filter];

        if (value === "top-rated") {
            _products.sort((a, b) => b.rating - a.rating);
        }
        else if (value === "lower-higher-price") {
            _products.sort((a, b) => a.price - b.price);
        }
        else if (value === "higher-lower-price") {
            _products.sort((a, b) => b.price - a.price);
        }

        setFilter(_products)
        orderClose();
    }
    return (
        <>
            <h1 className='title-page'>{capitalize(typeBody)}</h1>
            <input className='SearchInput'
                onChange={filterProducts}
                type='text'
                name='SearchInput'
                placeholder='Search'>
            </input>
            {
                filter &&
                <>
                    <div id="category-chance-links">
                        <div>
                            <Link id="filter-category-chance-link">
                                <img id="filter-category-chance-img" src={filterIcon} alt={filterIcon} />
                                <span>Filter</span>
                            </Link>
                        </div>
                        <div>
                            <Link id="order-category-chance-link" onClick={orderShow}>
                                <img id="order-category-chance-img" src={orderIcon} alt={orderIcon} />
                                <span>Order</span>
                            </Link>
                        </div>
                    </div>
                    <Row>{filter.map(filter => <CardProductSearchList key={filter._id} product={filter}></CardProductSearchList>)}</Row>

                    <Modal show={showOrder} onHide={orderClose}>
                        <Modal.Header id="header-filter-order" closeButton></Modal.Header>
                        <Modal.Body>
                            {
                                <form id="order">
                                    <label>Top rated</label>
                                    <input type="radio" name="order" onChange={orderProducts} value="top-rated" /><br />
                                    <label>Lower to higher price</label>
                                    <input type="radio" name="order" onChange={orderProducts} value="lower-higher-price" /><br />
                                    <label>Higher to lower price</label>
                                    <input type="radio" name="order" onChange={orderProducts} value="higher-lower-price" /><br />
                                </form>
                            }
                        </Modal.Body>
                    </Modal>
                </>
            }
        </>
    );
}

export default CategoryChance;