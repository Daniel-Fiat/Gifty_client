import './SearchPage.css'
import { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import CardSearchList from '../../components/CardSearchList/CardSearchList';
import ProductAPI from '../../services/product.service'

import Desayunos from '../../assets/CategoryImages/Desayunos.png';
import Pasteleria from '../../assets/CategoryImages/Pasteleria.png';
import Picadas from '../../assets/CategoryImages/Picadas.png';
import Bebidas from '../../assets/CategoryImages/Bebidas.png';
import Flores from '../../assets/CategoryImages/Flores.png';
import Objetos from '../../assets/CategoryImages/Objetos.png';

import Cumpleanos from '../../assets/OcasionImages/Cumpleanos.png';
import Aniversarios from '../../assets/OcasionImages/Aniversarios.png';
import SanValentin from '../../assets/OcasionImages/SanValentin.png';
import Bodas from '../../assets/OcasionImages/Bodas.png';
import BabyShower from '../../assets/OcasionImages/BabyShower.png';
import Graduaciones from '../../assets/OcasionImages/Graduaciones.png';
import CardProductSearchList from '../../components/CardProductSearchList/CardProductSearchList';
import InfiniteScroll from 'react-infinite-scroll-component';
import productService from '../../services/product.service';


const Search = () => {
    const [filter, setFilter] = useState();
    const [valueState, setValueState] = useState()
    const [offset, setOffset] = useState(0)


    const filterProducts = (event) => {
        const { value } = event.target;
        setValueState(value)
        setOffset(0);
        setOffset((state) => {
            value
                ?
                ProductAPI
                    .getAllproduct({ name: { $regex: value, $options: 'i' } }, 12, state)
                    .then(products => {
                        setFilter(products)
                        setOffset(1)
                    })
                : setFilter(undefined);
            return state;
        });


    }

    const fetchData = () => {
        setOffset(offset + 1)

        ProductAPI
            .getAllproduct({ name: { $regex: valueState, $options: 'i' } }, 12, offset)
            .then(products => {
                products.length && setFilter([...filter, ...products])
            })
    }
    return (
        <Row>
            <div>
                <h1>Search</h1>
                <input className='SearchInput'
                    onChange={filterProducts}
                    type='text'
                    name='SearchInput'
                    placeholder='Search'>
                </input>

                {
                    filter
                        ?
                        <InfiniteScroll
                            dataLength={filter.length} //This is important field to render the next data
                            next={fetchData}
                            hasMore={true}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }>
                            <Row>
                                {
                                    filter.map(filter => <CardProductSearchList product={filter}></CardProductSearchList>)
                                }
                            </Row>
                        </InfiniteScroll>
                        :
                        <div>
                            <h2 className='title-search-category'>Search by Category</h2>
                            <Row>
                                <CardSearchList img={Desayunos} title="Breakfast" path="category-breakfast"></CardSearchList>
                                <CardSearchList img={Pasteleria} title="Cakes" path="category-cakes"></CardSearchList>
                                <CardSearchList img={Picadas} title="Tapas" path="category-tapas"></CardSearchList>
                                <CardSearchList img={Bebidas} title="Drinks" path="category-drinks"></CardSearchList>
                                <CardSearchList img={Flores} title="Flowers" path="category-flowers"></CardSearchList>
                                <CardSearchList img={Objetos} title="Objects" path="category-objects"></CardSearchList>
                            </Row>

                            <h2 className='title-search-category'>Search by Chance</h2>
                            <Row>
                                <CardSearchList img={Cumpleanos} title="Birthday" path="chance-birthday"></CardSearchList>
                                <CardSearchList img={Aniversarios} title="Anniversary" path="chance-anniversary"></CardSearchList>
                                <CardSearchList img={SanValentin} title="Valentine" path="chance-valentine"></CardSearchList>
                                <CardSearchList img={Bodas} title="Weddings" path="chance-weddings"></CardSearchList>
                                <CardSearchList img={BabyShower} title="Baby Shower" path="chance-babyshower"></CardSearchList>
                                <CardSearchList img={Graduaciones} title="Graduation" path="chance-graduation"></CardSearchList>
                            </Row>
                        </div>
                }
            </div>
        </Row>
    );
}

export default Search;