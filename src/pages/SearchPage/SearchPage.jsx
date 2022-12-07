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
    localStorage.setItem("Navbar", true);
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
        <>
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
                            <CardSearchList img={Desayunos} title="Breakfast"></CardSearchList>
                            <CardSearchList img={Pasteleria} title="Cakes"></CardSearchList>
                            <CardSearchList img={Picadas} title="Tapas"></CardSearchList>
                            <CardSearchList img={Bebidas} title="Drinks"></CardSearchList>
                            <CardSearchList img={Flores} title="Flowers"></CardSearchList>
                            <CardSearchList img={Objetos} title="Objects"></CardSearchList>
                        </Row>

                        <h2 className='title-search-category'>Search by Chance</h2>
                        <Row>
                            <CardSearchList img={Cumpleanos} title="Birthday"></CardSearchList>
                            <CardSearchList img={Aniversarios} title="Anniversary"></CardSearchList>
                            <CardSearchList img={SanValentin} title="Valentine"></CardSearchList>
                            <CardSearchList img={Bodas} title="Weddings"></CardSearchList>
                            <CardSearchList img={BabyShower} title="Baby Shower"></CardSearchList>
                            <CardSearchList img={Graduaciones} title="Graduation"></CardSearchList>
                        </Row>

                    </div>
            }



        </>
    );
}

export default Search;