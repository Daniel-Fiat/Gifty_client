import './RegisterPage.css'
import elipseBlueUp from '../../assets/ElipseAzulArriba.png';
import elipsePinkUp from '../../assets/ElipseRosaArriba.png';
import elipseBlueDown from '../../assets/ElipseAzulAbajo.png';
import elipseYellowDown from '../../assets/ElipseAmarillaAbajo.png';
import UserApi from '../../services/user.service'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    localStorage.removeItem("Navbar");
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const [matchPass, setMatchPass] = useState(false)
    const [errUserCreate, setError] = useState(false)

    const createNewUSer = (event) => {
        event.preventDefault()
        if (matchPass && user.email) {
            UserApi.createUser(user)
                .then(() => navigate('/login'))
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
                <h1>Register</h1>
                <form onSubmit={createNewUSer}>
                    <input className='RegisterInput'
                        onChange={updateNewUser}
                        type='email'
                        name='email'
                        placeholder='Email'>
                    </input>
                    <input className='RegisterInput'
                        onChange={updateNewUser}
                        type='password'
                        name='password'
                        placeholder='************'>
                    </input>
                    <input className='RegisterInput'
                        onChange={testmatchPass}
                        type='password'
                        name='pass2'
                        placeholder='************'>
                    </input>
                    <button type="submit" id="registerBoton">Create User</button>
                    {errUserCreate && <p id="msgred">Password not match </p>}
                </form>
            </div>
            <img className="elipse-blue-down" src={elipseBlueDown} alt="" />
            <img className="elipse-yellow-down" src={elipseYellowDown} alt="" />
        </div>
    );

}

export default Register;