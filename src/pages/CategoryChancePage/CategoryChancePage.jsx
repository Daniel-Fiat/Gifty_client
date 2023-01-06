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
import InfiniteScroll from 'react-infinite-scroll-component';

const CategoryChance = () => {
    const { type } = useParams();
    const categoryChanceTypeApi = type.split("-")[0];
    const categoryChanceType = type.split("-")[1];
    const AgeRange = ["babyboomers", 'generaciónX', 'millennials', 'generaciónZ', 'Alpha'];

    const [offset, setOffset] = useState(4)
    const [filter, setFilter] = useState([])
    const [sort, setSort] = useState()
    const [valueSearch, setvalueSearch] = useState("")

    const [selectedOption, setSelectedOption] = useState()
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(2500)
    const [ageState, setAgeState] = useState(undefined);

    const [showOrder, setShowOrder] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const LIMIT = 12
    const orderClose = () => setShowOrder(false)
    const orderShow = () => { setShowOrder(true) }

    const filterClose = () => setShowFilter(false)
    const filterShow = () => { setShowFilter(true) }

    useEffect(() => {
        ProductAPI
            .getAllproduct({ [categoryChanceTypeApi]: categoryChanceType }, LIMIT)
            .then(products => {
                setFilter(products)
                setOffset(4)
            })
    }, [])

    const filterProductsSearch = (event) => {
        const { value } = event.target;
        setvalueSearch(value)
        setOffset(4)
        ProductAPI
            .getAllproduct({ [categoryChanceTypeApi]: categoryChanceType, name: { $regex: value, $options: 'i' }, price: { $gte: minPrice, $lte: maxPrice }, rangeAge: ageState }, LIMIT, 0, sort)
            .then(products => {
                setFilter(products)
            })
    }

    const orderProducts = (event) => {
        const { value } = event.target;
        let thissort;
        setSelectedOption(value);
        setOffset(4)

        if (value === "lower-higher-price") { setSort({ price: 1, createdAt: 1 }); thissort = { price: 1, createdAt: 1 } }
        else if (value === "higher-lower-price") { setSort({ price: -1, createdAt: 1 }); thissort = { price: -1, createdAt: 1 } }
        else { setSort({ rating: -1, createdAt: 1 }); thissort = { rating: -1, createdAt: 1 } }

        ProductAPI
            .getAllproduct({ [categoryChanceTypeApi]: categoryChanceType, name: { $regex: valueSearch, $options: 'i' }, price: { $gte: minPrice, $lte: maxPrice }, rangeAge: ageState }, LIMIT, 0, thissort)
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
    const updateAgeRange = (e) => {
        let { value } = e.target;
        console.log(value);
        if (value === "") { value = undefined; }
        setAgeState(value);

    }
    const filterProducts = (e) => {
        e.preventDefault();
        setOffset(4)
        ProductAPI
            .getAllproduct({ [categoryChanceTypeApi]: categoryChanceType, name: { $regex: valueSearch, $options: 'i' }, price: { $gte: minPrice, $lte: maxPrice }, rangeAge: ageState }, LIMIT, 0, sort)
            .then(products => {
                setFilter(products)
            })

        filterClose();

    }
    const fetchData = () => {
        ProductAPI
            .getAllproduct({ [categoryChanceTypeApi]: categoryChanceType, name: { $regex: valueSearch, $options: 'i' }, price: { $gte: minPrice, $lte: maxPrice }, rangeAge: ageState }, 3, offset, sort)
            .then(products => {
                setFilter([...filter, ...products])
                setOffset(offset + 1)
            })
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
                filter &&
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
                    <InfiniteScroll
                        dataLength={filter.length}
                        next={fetchData}
                        hasMore={true}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }>
                        <Row>
                            {

                                filter.map(filter => <CardProductSearchList key={filter._id} product={filter}></CardProductSearchList>)

                            }
                        </Row>
                    </InfiniteScroll>
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
                                        <p>Price range</p>
                                        <MultiRangeSlider
                                            name="range-price"
                                            min={0}
                                            defmin={minPrice}
                                            defmax={maxPrice}
                                            max={2500}
                                            onChange={updatePrice}
                                        />
                                        <p>Age range</p>
                                        <select id="selectRangeAge" name="select" onChange={updateAgeRange}>
                                            <option value="" selected={ageState === undefined}>Select a option</option>
                                            {
                                                AgeRange.map((age) => {
                                                    return (<option value={age} selected={ageState === age}>{age}</option>);
                                                })
                                            }
                                        </select>
                                        <button id="buttonfilter" type='submit'>Apply filters</button>
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