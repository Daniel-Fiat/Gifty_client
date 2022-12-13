import './LoginPage.css'
import elipseBlueUp from '../../assets/ElipseAzulArriba.png';
import elipsePinkUp from '../../assets/ElipseRosaArriba.png';
import elipseBlueDown from '../../assets/ElipseAzulAbajo.png';
import elipseYellowDown from '../../assets/ElipseAmarillaAbajo.png';
import UserApi from '../../services/user.service'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { Row } from 'react-bootstrap';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const [errUser, setError] = useState(false)
    const { storeSetToken, authentication } = useContext(AuthContext);

    const updateUser = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value });

    }
    const loginUser = (event) => {
        event.preventDefault()
        UserApi.login(user)
            .then((res) => {
                storeSetToken(res.token);
                authentication();
                navigate('/')
            })
            .catch(err => setError(true))
    }

    return (
        <Row>
            <div className='Login-form-container'>
                <img className="elipse-blue-up" src={elipseBlueUp} alt="" />
                <img className="elipse-pink-up" src={elipsePinkUp} alt="" />
                <div id="Login-form">
                    <h1>Welcome</h1>
                    <span>Login</span>
                    <form onSubmit={loginUser}>
                        <input className='LoginInput'
                            onChange={updateUser}
                            type='email'
                            name='email'
                            placeholder='Email'>
                        </input>
                        <input className='LoginInput'
                            onChange={updateUser}
                            type='password'
                            name='password'
                            placeholder='************'>
                        </input>
                        <button type="submit" id="LoginBoton">Login</button>
                        {errUser && <p id="msgred">Password or User not match </p>}
                    </form>
                </div>
                <img className="elipse-blue-down" src={elipseBlueDown} alt="" />
                <img className="elipse-yellow-down" src={elipseYellowDown} alt="" />
            </div>
        </Row>
    )
}
export default Login;