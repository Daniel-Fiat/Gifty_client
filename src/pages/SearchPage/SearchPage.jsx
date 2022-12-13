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


const Search = () => {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState();


    useEffect(() => {
        ProductAPI.getAllproduct().then(products => {
            setProducts(products)
        })
    }, [])

    const filterProducts = (event) => {
        const { value } = event.target;
        let _products = [...products];

        _products = _products.filter((product) => product.name.toLowerCase().includes(value.toLowerCase()));

        value ? setFilter(_products) : setFilter(undefined)
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
                        <Row>{
                            filter.map(filter => <CardProductSearchList product={filter}></CardProductSearchList>)
                        }
                        </Row>
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