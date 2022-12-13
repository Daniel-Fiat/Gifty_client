import { AuthContext } from '../../../context/auth.context';
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductAPI from '../../../services/product.service'
import './giftyProductPage.css'
import UserApi from '../../../services/user.service'
import OrderApi from '../../../services/order.service'
import StripeAPI from '../../../services/stripe.services'


const GiftyProduct = () => {
    const navigate = useNavigate();
    localStorage.setItem("Navbar", true);
    const [validateWishList, setwishList] = useState()
    const [product, setProduct] = useState({})
    const [order, setOrder] = useState({})
    const [adress, setAdress] = useState({})
    const { user } = useContext(AuthContext)
    const { id } = useParams()

    useEffect(() => {
        ProductAPI.getOneProduct(id)
            .then(product => {
                setProduct(product)
            })
    }, [])

    const updateOrder = (event) => {
        const { name, value } = event.target
        setOrder({ ...order, [name]: value })
        console.log(product.sellerUser._id)
    }

    const updateAdress = (event) => {
        const { name, value } = event.target
        setAdress({ ...adress, [name]: value })
        console.log(adress)
    }

    useEffect(() => {
        UserApi.getOne(user?._id).then(userApi => {
            const newvalidate = userApi.wishList.includes(product._id)
            setwishList(newvalidate)
        })
    }, [user])

    const removeWishList = (event) => {
        event.preventDefault()
        UserApi.removeWishList(user._id, id).then()
        const newvalidate = true
        setwishList(newvalidate)
    }

    const addWishList = (event) => {
        event.preventDefault()
        UserApi.addWishList(user._id, id).then()
        const newvalidate = false
        setwishList(newvalidate)
    }

    const CreateOrder = (event) => {
        event.preventDefault()
        const body = {
            "price": product.price,
            "sellerUser": product.sellerUser._id,
            "clientUser": user._id,
            "productID": product._id,
            "dedication": order.dedication,
            "deliverDate": order.date,
            "State": "pendingPayment",
            "deliveryAddress": adress,
        }
        OrderApi.newOrder(body).then(res => {

            const checkout = {
                "line_items": [
                    {
                        "price_data": {
                            "currency": "usd",
                            "product_data": {
                                "name": product.name
                            },
                            "unit_amount": product.price * 100
                        },
                        "quantity": 1
                    }],
                "mode": "payment",
                "success_url": `http://localhost:3000/sucessPayment/${res._id}`,
                "cancel_url": "http://localhost:3000/"

            }
            StripeAPI.checkout(checkout).then(res => window.location.href = res.url)
        })

    }

    return (
        <div id="ProductCard">
            <img id="IMGproduct" src={product.imgUrl} alt="esto" />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <span>{`$ ${product.price}`}</span>
            <span>{product.sellerUser?.email}</span>
            <h1>{"⭐".repeat(product.rating)}</h1>
            {validateWishList ?
                (<form onSubmit={addWishList}>
                    <button type="submit">add</button>
                </form>) :
                (<form onSubmit={removeWishList}>
                    <button type="submit">remuv</button>
                </form>)
            }
            <form onSubmit={CreateOrder}>
                <label >Escribe tu dedicatoria</label>
                <textarea
                    name="dedication"
                    rows="4"
                    cols="40"
                    onChange={updateOrder}
                ></textarea>
                <label >El ife Fecha y Hora</label>
                <input onChange={updateAdress} type="date" name="date" id="" onChange={updateOrder} />
                <input onChange={updateAdress} type="text" name="street" id="" />
                <input onChange={updateAdress} type="text" name="number" id="" />
                <input onChange={updateAdress} type="text" name="door" id="" />
                <input onChange={updateAdress} type="text" name="floor" id="" />
                <input onChange={updateAdress} type="text" name="city" id="" />
                <button type="submit">CreateProduct</button>
            </form>
        </div>
    );


}

export default GiftyProduct;