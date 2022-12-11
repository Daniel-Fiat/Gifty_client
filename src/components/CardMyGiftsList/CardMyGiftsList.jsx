import './CardMyGiftsList.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const CardCatalogList = ({ order }) => {
    return (
        <Row xs={1} md={2} className="g-4">
            <Col>
                <Card>
                    <Card.Img variant="top" src={order.productID.imgUrl} />
                    <Card.Body>
                        <Card.Title>{order.productID.name}</Card.Title>
                        <Card.Title>{order.price}</Card.Title>
                        <Card.Title>{order.sellerUser.email}</Card.Title>
                        <Card.Title>{order.deliverDate}</Card.Title>
                        <Card.Title>{order.State}</Card.Title>
                        <Card.Text>
                            {order.dedication}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}
export default CardCatalogList;