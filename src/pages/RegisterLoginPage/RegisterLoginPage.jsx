import './RegisterLoginPage.css'
import elipseBlueUp from '../../assets/ElipseAzulArriba.png';
import elipsePinkUp from '../../assets/ElipseRosaArriba.png';
import elipseBlueDown from '../../assets/ElipseAzulAbajo.png';
import elipseYellowDown from '../../assets/ElipseAmarillaAbajo.png';
import UserApi from '../../services/user.service'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    localStorage.removeItem("Navbar");
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const [matchPass, setMatchPass] = useState(false)
    const [errUserCreate, setError] = useState(false)

    const createNewUSer = (event) => {
        event.preventDefault()
        if (matchPass && user.email) {
            console.log(user)
            UserApi.createUser(user)
                .then(() => navigate('/'))
                .catch(err => setError(true))
        } else {
            setError(true)
        }
    }
    const updateNewUser = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value });
        console.log(user)
    }
    const testmatchPass = (event) => {
        const { value } = event.target
        if (value === user?.password) { setMatchPass(true) }
        else { setMatchPass(false) }
        console.log(value)
        console.log(user?.password)
    }


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

export default Register;