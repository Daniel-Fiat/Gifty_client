import { AuthContext } from '../../../context/auth.context';
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductAPI from '../../../services/product.service'
import ReviewAPI from '../../../services/review.service'
import './ProductDetails.css'
import UserApi from '../../../services/user.service'
import wishTrue from '../../../assets/Corazon-rojo.png';
import wishFalse from '../../../assets/Corazon-Blanco.png';

//http://localhost:3000/product/638f21e7fc32fef2b3800a95

const ProductDetail = () => {
    const [validateWishList, setValidateWishList] = useState()
    const [product, setProduct] = useState({})
    const [reviews, setReviews] = useState()
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

    useEffect(() => {
        ReviewAPI.getByProduct(id).then(reviews => {
            setReviews(reviews)
        })

    }, [])

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

    return (
        <>
            {
                product ?
                    (<div id="ProductCard">
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
                        <span>{product.rangeAge}</span>
                        <span>{product.sellerUser?.email}</span>
                        <h1>{"⭐".repeat(product.rating)}</h1>
                    </div>)
                    :
                    (<p>Loading...</p>)
            }
            <Link to={`/gifty/${product._id}`}>
                Regalar
            </Link>

            {reviews?.map(review => {
                return (
                    <div>
                        <h1> {"⭐".repeat(review.rating)}</h1>
                        <h1> {review.userId.email}</h1>
                        <span> {review.createdAt}</span>
                        <p> {review.comment}</p>
                    </div>
                )
            })}


        </>
    );

}

export default ProductDetail;