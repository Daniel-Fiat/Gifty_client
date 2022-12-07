import { Link, useParams } from "react-router-dom";
import ProductAPI from '../../../services/product.service'
import { useContext, useEffect, useState } from "react";
import './ProductDetails.css'
import UserApi from '../../../services/user.service'
import { AuthContext } from '../../../context/auth.context';

//http://localhost:3000/product/638f21e7fc32fef2b3800a95

const ProductDetail = () => {
    localStorage.setItem("Navbar", true);
    const { user } = useContext(AuthContext);
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [validateWishList, setwishList] = useState()
    const LOCAL_STORAGE_AUTH = 'tokenAuth';

    useEffect(() => {
        ProductAPI.getOneProduct(id)
            .then(product => {
                setProduct(product)
            })
    }, [])
    useEffect(() => {
        const newvalidate = user?.wishList.includes(product._id)
        setwishList(newvalidate)
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
    return (
        <div id="ProductCard">
            <img id="IMGproduct" src={product.imgUrl} alt="esto" />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <span>{`$ ${product.price}`}</span>
            <span>{product.sellerUser?.email}</span>
            <h1>{"❤".repeat(product.rating)}</h1>
            {validateWishList ?
                (<form onSubmit={addWishList}>
                    <button type="submit">add</button>
                </form>) :
                (<form onSubmit={removeWishList}>
                    <button type="submit">remuv</button>
                </form>)

            }
        </div>
    );


}

export default ProductDetail;