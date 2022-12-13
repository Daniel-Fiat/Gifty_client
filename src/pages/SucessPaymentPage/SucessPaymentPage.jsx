import checkGreen from '../../assets/check-green.gif';
import elipseBlueUp from '../../assets/ElipseAzulArriba.png';
import elipsePinkUp from '../../assets/ElipseRosaArriba.png';
import elipseBlueDown from '../../assets/ElipseAzulAbajo.png';
import elipseYellowDown from '../../assets/ElipseAmarillaAbajo.png';
import './SucessPaymentPage.css';
import { Row } from 'react-bootstrap';
const SucessPayment = () => {
    return (
        <Row>
            <div className='sucess-payment-container'>
                <img className="elipse-blue-up" src={elipseBlueUp} alt="" />
                <img className="elipse-pink-up" src={elipsePinkUp} alt="" />
                <h1>¡Sucess Payment!</h1>
                <img id="check-green" src={checkGreen} alt="Check Green" loop="1" />
                <img className="elipse-blue-down" src={elipseBlueDown} alt="" />
                <img className="elipse-yellow-down" src={elipseYellowDown} alt="" />
            </div>
        </Row>
    )
}
export default SucessPayment;