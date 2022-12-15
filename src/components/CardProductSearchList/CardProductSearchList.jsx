import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import './CardProductSearchList.css';

const CardProductSearchList = ({ product }) => {
    return (
        <Col className="card-search-product" xs="4" lg="4">
            <Link to={`/product/${product._id}`}>
                <div>
                    <img src={product.imgUrl} alt="" />
                    <p className="title">{product.name.length > 22 ?
                        product.name.substring(0, 20) + "..." :
                        product.name}</p>
                    <p className="price">{product.price}€</p>
                    <p className="rating">{'⭐'.repeat(product.rating)}</p>
                </div>
            </Link>
        </Col >
    )
}
export default CardProductSearchList;