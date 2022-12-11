import './MygiftsPage.css'
import { useState, useEffect, useContext } from 'react';
import OrderAPI from '../../../services/order.service'
import { AuthContext } from '../../../context/auth.context';
import CardMyGiftsList from '../../../components/CardMyGiftsList/CardMyGiftsList';

const Mygifts = () => {
    const { user } = useContext(AuthContext)
    const [orders, setOrders] = useState([])
    localStorage.setItem("Navbar", true)

    useEffect(() => {
        OrderAPI.getByClient(user._id).then(orders => {
            setOrders(orders)
        })
    }, [])


    return (
        <>
            <h1>Mygiftys</h1>
            {
                orders.map(order => {
                    return (
                        <>
                            <CardMyGiftsList id="card" order={order}>
                            </CardMyGiftsList>
                        </>
                    )
                })
            }

        </>
    );

}

export default Mygifts;