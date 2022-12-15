import { AuthContext } from '../../../context/auth.context';
import { useContext, useEffect, useState } from "react";
import ProductAPI from '../../../services/product.service'
import './giftyProductPage.css'
import UserApi from '../../../services/user.service'
import OrderApi from '../../../services/order.service'
import StripeAPI from '../../../services/stripe.services'
import wishTrue from '../../../assets/Corazon-rojo.png';
import wishFalse from '../../../assets/Corazon-Blanco.png';
import { useParams } from 'react-router-dom';


const GiftyProduct = () => {
    const [validateWishList, setValidateWishList] = useState()
    const [product, setProduct] = useState({})
    const [order, setOrder] = useState({})
    const [adress, setAdress] = useState({})
    const { user } = useContext(AuthContext)
    const { id } = useParams()

    useEffect(() => {
        ProductAPI.getOneProduct(id)
            .then(productRes => {
                return productRes
            })
            .then((productRes) => {
                setProduct(productRes)
                if (user) {
                    UserApi.getOne(user._id).then(userApi => {
                        const newvalidate = userApi.wishList.includes(productRes._id)
                        setValidateWishList(newvalidate)
                    })
                }
            })
    }, [validateWishList])

    const updateOrder = (event) => {
        const { name, value } = event.target
        setOrder({ ...order, [name]: value })

    }

    const updateAdress = (event) => {
        const { name, value } = event.target
        setAdress({ ...adress, [name]: value })

    }

    const removeWishList = (event) => {
        event.preventDefault()
        UserApi.removeWishList(user._id, id).then()
        const newvalidate = false
        setValidateWishList(newvalidate)
    }

    const addWishList = (event) => {
        event.preventDefault()
        UserApi.addWishList(user._id, id).then()
        const newvalidate = true
        setValidateWishList(newvalidate)
    }

    const CreateOrder = (event) => {
        event.preventDefault()

        const body = {
            "price": product.price,
            "sellerUser": product.sellerUser._id,
            "clientUser": user._id,
            "productID": product._id,
            "dedication": order.dedication,
            "deliverDate": `${order.date}`,
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
                "cancel_url": `http://localhost:3000/cancelPayment/${res._id}`

            }
            StripeAPI.checkout(checkout).then(res => window.location.href = res.url)
        })

    }

    return (
        <div id="ProductCard">
            <figure id='figure-imgProduct'>
                <img id="IMGproduct" src={product.imgUrl} alt="esto" />
                <figcaption>
                    {validateWishList ?
                        (<form onSubmit={removeWishList}>
                            <button type="submit"><img src={wishTrue} alt={wishTrue}></img></button>
                        </form>)
                        :
                        (<form onSubmit={addWishList}>
                            <button type="submit"><img src={wishFalse} alt={wishFalse}></img></button>
                        </form>)

                    }
                </figcaption>
            </figure>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <span>{`$ ${product.price}`}</span>
            <span>{product.sellerUser?.email}</span>
            <h1>{"⭐".repeat(product.rating)}</h1>
            <form id="formRegalo" onSubmit={CreateOrder}>
                <label >Escribe tu dedicatoria</label>
                <textarea
                    name="dedication"
                    rows="4"
                    cols="40"
                    onChange={updateOrder}
                ></textarea>
                <label >Fecha y Hora</label>
                <input onChange={updateOrder} type="date" name="date" />
                <label >Calle</label>
                <input onChange={updateAdress} type="text" name="street" />
                <label >Numero</label>
                <input onChange={updateAdress} type="text" name="number" />
                <label >Piso</label>
                <input onChange={updateAdress} type="text" name="floor" />
                <label >Puerta</label>
                <input onChange={updateAdress} type="text" name="door" />
                <label >Ciudad</label>
                <input onChange={updateAdress} type="text" name="city" />
                <button type="submit">CreateProduct</button>
            </form>
        </div>
    );


}

export default GiftyProduct;