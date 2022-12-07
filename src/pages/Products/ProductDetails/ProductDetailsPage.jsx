import { useParams } from "react-router-dom";
import ProductAPI from '../../../services/product.service'
import { useEffect, useState } from "react";




const ProductDetail = () => {
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
        <>
            <h1>{product.name}</h1>
            <img src={product.imgUrl} alt="esto" />
            <h1>{product.imgUrl}</h1>
            <h1>{product.description}</h1>
            <h1>{product.price}</h1>
            <h1>{product.rating}</h1>
            <h1>{product.sellerUser?.email}</h1>

        </>
    );


}

export default ProductDetail;