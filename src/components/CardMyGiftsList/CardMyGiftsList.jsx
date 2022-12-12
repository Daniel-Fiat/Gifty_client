import './CardMyGiftsList.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ReviewAPI from '../../services/review.service'
import { Button } from 'react-bootstrap';
import { useState } from 'react';

const CardCatalogList = ({ order }) => {
    const [review, setReview] = useState({})
    const updateReview = (event) => {
        const { name, value } = event.target
        setReview({ ...review, [name]: value })
    }
    const createReview = (event) => {
        event.preventDefault()
        review.product_id = "algo"
        review.userId = order.clientUser._id
        review.product_id = order.productID._id
        ReviewAPI.newReview(review)
        console.log(review)
        console.log(order.productID._id)
    }

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
                        {order.State === "delivered" &&
                            <form onSubmit={createReview}>
                                <input onChange={updateReview} type="number" name="rating" id="rating" />
                                <textarea onChange={updateReview} name="comment" id="comment" cols="30" rows="10"></textarea>
                                <Button type="submit">Pedido Entregado</Button>
                            </form>
                        }
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}
export default CardCatalogList;