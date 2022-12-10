import './MygiftsPage.css'
import { useState, useEffect, useContext } from 'react';
import OrderAPI from '../../../services/order.service'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/auth.context';
import CardCatalogList from '../../../components/CardCatalogList/CardCatalogList';

const Mygifts = () => {
    const { user } = useContext(AuthContext);
    const [orders, setorders] = useState([])
    localStorage.setItem("Navbar", true);

    useEffect(() => {
        OrderAPI.getByClient(user._id).then(orders => {
            setorders(orders)
            console.log(orders)
        })
    }, [])

    return (
        <>
            <h1>Mygiftys</h1>
            {
                orders.map(orders => {
                    return (
                        <>
                            <CardCatalogList id="card" product={orders.productID}>
                            </CardCatalogList>
                        </>
                    )
                })
            }

        </>
    );

}

export default Mygifts;