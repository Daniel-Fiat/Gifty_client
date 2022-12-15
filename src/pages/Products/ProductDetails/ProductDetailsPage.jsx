import { AuthContext } from '../../../context/auth.context';
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductAPI from '../../../services/product.service'
import ReviewAPI from '../../../services/review.service'
import './ProductDetails.css'
import UserApi from '../../../services/user.service'
import wishTrue from '../../../assets/Corazon-rojo.png';
import wishFalse from '../../../assets/Corazon-Blanco.png';
import startRantingReview from '../../../assets/StarRatingReview.png';
import startRanting from '../../../assets/StarRating.png';

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

                (<div id="ProductCard">
                    <h1 id="titleCard">{product.name}</h1>
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
                    <p id='DetailsProduct' >{product.description}</p>
                    <h1><img id="StartRating" src={startRanting} alt="" />{product.rating}</h1>
                    <span id='PriceSpan'>{`${product.price} €`}</span>
                </div>)

            }
            <div id='Gift-boton'>
                <Link to={`/gifty/${product._id}`}>
                    Regalar
                </Link>
            </div>
            {reviews && <h5>reviews</h5>}
            {reviews?.map(review => {
                return (
                    <div>
                        <div class="card">
                            <div class="card-header">
                                {"⭐".repeat(review.rating)}
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">{review.userId.email}</h5>
                                <p class="card-text">{review.comment}</p>
                                <small> {review.createdAt}</small>
                            </div>
                        </div>
                    </div>
                )
            })}


        </>
    );

}

export default ProductDetail;