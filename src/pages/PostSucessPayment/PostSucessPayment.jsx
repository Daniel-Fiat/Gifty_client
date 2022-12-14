import './PostSucessPayment.css';
import { Row } from 'react-bootstrap';

import Gift from '../../assets/gift.png';

const PostSucessPayment = () => {
    return (
        <Row>
            <img src={Gift} alt="Gift.png" />
        </Row>
    );
}
export default PostSucessPayment;