import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import './CardCatalogList.css';

const CardCatalogList = ({ product }) => {
    return (
        <Col className="card-search-product" xs="4" lg="4">
            <Link to={`/user/UpdateProduct/${product._id}`}>
                <div>
                    <img src={product.imgUrl} alt="" />
                    <p className="title">{product.name}</p>
                    <p className="price">{product.price}€</p>
                    <p className="rating">{'⭐'.repeat(product.rating)}</p>
                </div>
            </Link>
        </Col >
    )
}
export default CardCatalogList;