import './MyShopPage.css'
import OrderAPI from '../../../services/order.service'
import { AuthContext } from '../../../context/auth.context'
import { useContext, useEffect, useState } from 'react'
import CardMyShop from '../../../components/CardMyShopList/CardMyShopList'
const MyShop = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        OrderAPI.getBySeller(user._id).then(orders => {
            const data = orders.filter(order => order.State !== "pendingPayment")
            console.log(data)
            setOrders(data)
        })
    }, [])
    return (
        <>
            {orders.map(order => <CardMyShop id="card" order={order} key={order._id}>
            </CardMyShop>)}
        </>
    )
}
export default MyShop