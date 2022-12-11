import './CategoryChancePage.css';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Modal } from 'react-bootstrap';

import MultiRangeSlider from "../../components/MultiRangeSlider/MultiRangeSlider";
import ProductAPI from '../../services/product.service';
import CardProductSearchList from '../../components/CardProductSearchList/CardProductSearchList';
import capitalize from '../../utils/capitalize';
import filterIcon from '../../assets/filter-icon.png';
import orderIcon from '../../assets/order-icon.png';

const CategoryChance = () => {
    localStorage.setItem("Navbar", true);
    const { type } = useParams();
    const categoryChanceTypeApi = type.split("-")[0];
    const categoryChanceType = type.split("-")[1];

    const [productState, setProductState] = useState();
    const [filter, setFilter] = useState();

    const [selectedOption, setSelectedOption] = useState();
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();

    const [showOrder, setShowOrder] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const orderClose = () => setShowOrder(false);
    const orderShow = () => { setShowOrder(true) };

    const filterClose = () => setShowFilter(false);
    const filterShow = () => { setShowFilter(true) };

    useEffect(() => {
        ProductAPI
            .getAllproduct(categoryChanceTypeApi === "category" ? { category: categoryChanceType } : { chance: categoryChanceType }, 12)
            .then(products => {
                setProductState(products)
            })
    }, [])

    const filterProductsSearch = (event) => {
        const { value } = event.target;
        let sort, priceFilter;

        if (selectedOption === "lower-higher-price") { sort = { price: 1 } } else if (selectedOption === "higher-lower-price") { sort = { price: -1 } } else { sort = { rating: -1 } }
        if (minPrice || maxPrice) { priceFilter = { $gte: minPrice, $lte: maxPrice } }

        ProductAPI
            .getAllproduct(
                categoryChanceTypeApi === "category"
                    ?
                    { category: categoryChanceType, name: { $regex: value, $options: 'i' }, price: priceFilter }
                    :
                    { chance: categoryChanceType, name: { $regex: value, $options: 'i' }, price: priceFilter }, 12, {}, sort)
            .then(products => {
                setFilter(products)
            })
    }

    const orderProducts = (event) => {
        const { value } = event.target;
        let sort, priceFilter;
        setSelectedOption(value);

        if (value === "lower-higher-price") { sort = { price: 1 } } else if (value === "higher-lower-price") { sort = { price: -1 } } else { sort = { rating: -1 } }
        if (minPrice || maxPrice) { priceFilter = { $gte: minPrice, $lte: maxPrice } }

        ProductAPI
            .getAllproduct(categoryChanceTypeApi === "category" ? { category: categoryChanceType, price: priceFilter } : { chance: categoryChanceType, price: priceFilter }, 12, {}, sort)
            .then(products => {
                setFilter(products)
            })

        orderClose();
    }

    const updatePrice = (e) => {
        const { min, max } = e;
        setMinPrice(min);
        setMaxPrice(max);
    }

    const filterProducts = (e) => {
        e.preventDefault();
        let sort;

        if (selectedOption === "lower-higher-price") { sort = { price: 1 } } else if (selectedOption === "higher-lower-price") { sort = { price: -1 } } else { sort = { rating: -1 } }

        ProductAPI
            .getAllproduct(categoryChanceTypeApi === "category" ? { category: categoryChanceType, price: { $gte: minPrice, $lte: maxPrice } } : { chance: categoryChanceType, price: { $gte: minPrice, $lte: maxPrice } }, 12, {}, sort)
            .then(products => {
                setFilter(products)
            })

        filterClose();

    }

    return (
        <>
            <h1 className='title-page'>{capitalize(categoryChanceType)}</h1>
            <input className='SearchInput'
                onChange={filterProductsSearch}
                type='text'
                name='SearchInput'
                placeholder='Search'>
            </input>
            {
                productState &&
                <>
                    <div id="category-chance-links">
                        <div>
                            <Link id="filter-category-chance-link" onClick={filterShow}>
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
                    <Row>
                        {
                            filter
                                ?
                                filter.map(filter => <CardProductSearchList key={filter._id} product={filter}></CardProductSearchList>)
                                :
                                productState.map(product => <CardProductSearchList key={product._id} product={product}></CardProductSearchList>)
                        }
                    </Row>

                    <Modal show={showOrder} onHide={orderClose}>
                        <Modal.Header id="header-filter" closeButton><h1>Order by</h1></Modal.Header>
                        <Modal.Body>
                            {
                                <form id="order">
                                    <label>Top rated</label>
                                    <input type="radio" name="order" onChange={orderProducts} value="top-rated" checked={selectedOption === "top-rated"} /><br />
                                    <label>Lower to higher price</label>
                                    <input type="radio" name="order" onChange={orderProducts} value="lower-higher-price" checked={selectedOption === "lower-higher-price"} /><br />
                                    <label>Higher to lower price</label>
                                    <input type="radio" name="order" onChange={orderProducts} value="higher-lower-price" checked={selectedOption === "higher-lower-price"} /><br />
                                </form>
                            }
                        </Modal.Body>
                    </Modal>

                    <Modal id="filter-modal" show={showFilter} onHide={filterClose}>
                        <Modal.Header id="header-filter" closeButton><h1>Filters</h1></Modal.Header>
                        <Modal.Body>
                            {
                                <>
                                    <form onSubmit={filterProducts}>
                                        <p>Range price</p>
                                        <MultiRangeSlider
                                            name="range-price"
                                            min={0}
                                            max={2500}
                                            onChange={updatePrice}
                                        />
                                        <button type='submit'>Apply filters</button>
                                    </form>
                                </>
                            }
                        </Modal.Body>
                    </Modal>
                </>
            }
        </>
    );
}

export default CategoryChance;