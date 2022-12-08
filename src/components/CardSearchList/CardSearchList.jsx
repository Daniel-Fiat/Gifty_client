import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import './CardSearchList.css';

const CardSearchList = ({ img, title, path }) => {
    return (
        <Col className="card-search" xs="4" lg="4">
            <Link to={path}>
                <div>
                    <figure>
                        <img src={img} alt="" />
                        <figcaption>{title}</figcaption>
                    </figure>
                </div>
            </Link>
        </Col>
    )
}
export default CardSearchList;