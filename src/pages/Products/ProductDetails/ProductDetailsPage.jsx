import { Link, useParams } from "react-router-dom";
import ProductAPI from '../../../services/product.service'
import { useEffect, useState } from "react";
import './ProductDetails.css'



const ProductDetail = () => {
    localStorage.setItem("Navbar", true);
    const { id } = useParams()
    const [product, setProduct] = useState({})


    useEffect(() => {
        console.log(id)
        ProductAPI.getOneProduct(id)
            .then(product => {
                setProduct(product)
                console.log(product)
            })
    }, [])

    return (
        <div id="ProductCard">
            <img id="IMGproduct" src={product.imgUrl} alt="esto" />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <span>{`$ ${product.price}`}</span>
            <span>{product.sellerUser?.email}</span>
            <h1>{"❤".repeat(product.rating)}</h1>
            <Link type="submit" id="GiftButtom" to={`/product/${product._id}`}>Regalar</Link>

        </div>
    );


}

export default ProductDetail;