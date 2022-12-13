import './RegisterLoginPage.css'
import elipseBlueUp from '../../assets/ElipseAzulArriba.png';
import elipsePinkUp from '../../assets/ElipseRosaArriba.png';
import elipseBlueDown from '../../assets/ElipseAzulAbajo.png';
import elipseYellowDown from '../../assets/ElipseAmarillaAbajo.png';
import { Link } from 'react-router-dom';

const RegisterLogin = () => {
    localStorage.removeItem("Navbar");

    return (
        <div className='register-form-container'>
            <img className="elipse-blue-up" src={elipseBlueUp} alt="" />
            <img className="elipse-pink-up" src={elipsePinkUp} alt="" />
            <div id="register-form">
                <h1>Bienvenido</h1>
                <p>Para poder hacer tu regalo necesitas estar registrado</p>
                <Link to='/login'><button id="registerBoton">Login</button></Link>
                <Link to='/register'><button id="registerBoton">Register</button></Link>
            </div>
            <img className="elipse-blue-down" src={elipseBlueDown} alt="" />
            <img className="elipse-yellow-down" src={elipseYellowDown} alt="" />
        </div>
    );
}

export default RegisterLogin;