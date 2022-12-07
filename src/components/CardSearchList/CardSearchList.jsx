import { Col } from "react-bootstrap";
import './CardSearchList.css';

const CardSearchList = ({ img, title }) => {
    return (
        <Col className="card-search" xs="4" lg="4">
            <div>
                <figure>
                    <img src={img} alt="" />
                    <figcaption>{title}</figcaption>
                </figure>
            </div>
        </Col>
    )
}
export default CardSearchList;