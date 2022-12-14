import './PostSucessPayment.css';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Gift from '../../assets/gift.png';
import elipseBlueUp from '../../assets/ElipseAzulArriba.png';
import elipsePinkUp from '../../assets/ElipseRosaArriba.png';
import elipseBlueDown from '../../assets/ElipseAzulAbajo.png';
import elipseYellowDown from '../../assets/ElipseAmarillaAbajo.png';

const PostSucessPayment = () => {
    return (
        <Row>
            <div id="post-sucess-container">
                <img className="elipse-blue-up" src={elipseBlueUp} alt="" />
                <img className="elipse-pink-up" src={elipsePinkUp} alt="" />
                <img id="img-gift" src={Gift} alt="Gift.png" />
                <h1 id="post-sucess-title">Listo,<br />¡Ya tenés tu regalo!</h1>
                <h3 id="post-sucess-subtitle">¿Que hacemos ahora?</h3>
                <Link to="/" id="post-sucess-button-home">Ir a inicio</Link>
                <Link to="/user/mygifts" id="post-sucess-button-gifts">Ir a mis regalos</Link>
                <img className="elipse-blue-down" src={elipseBlueDown} alt="" />
                <img className="elipse-yellow-down" src={elipseYellowDown} alt="" />
            </div>
        </Row>
    );
}
export default PostSucessPayment;