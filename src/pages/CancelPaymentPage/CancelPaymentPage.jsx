import checkGreen from '../../assets/check-green.gif';
import elipseBlueUp from '../../assets/ElipseAzulArriba.png';
import elipsePinkUp from '../../assets/ElipseRosaArriba.png';
import elipseBlueDown from '../../assets/ElipseAzulAbajo.png';
import elipseYellowDown from '../../assets/ElipseAmarillaAbajo.png';
import OrderApi from '../../services/order.service'
import './CancelPaymentPage.css';
import { Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const CancelPayment = () => {
    const { id } = useParams()
    useEffect(() => {
        OrderApi.updateState(id, "reject")
    })
    return (
        <Row>
            <div className='sucess-payment-container'>
                <img className="elipse-blue-up" src={elipseBlueUp} alt="" />
                <img className="elipse-pink-up" src={elipsePinkUp} alt="" />
                <h1>¡Cancel Payment!</h1>
                <img id="check-green" src={checkGreen} alt="Check Green" loop="1" />
                <img className="elipse-blue-down" src={elipseBlueDown} alt="" />
                <img className="elipse-yellow-down" src={elipseYellowDown} alt="" />
            </div>
        </Row>
    )
}
export default CancelPayment;