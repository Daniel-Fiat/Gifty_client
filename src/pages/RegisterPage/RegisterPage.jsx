import './RegisterPage.css'
import elipseBlueUp from '../../assets/ElipseAzulArriba.png';
import elipsePinkUp from '../../assets/ElipseRosaArriba.png';
import elipseBlueDown from '../../assets/ElipseAzulAbajo.png';
import elipseYellowDown from '../../assets/ElipseAmarillaAbajo.png';
import UserApi from '../../services/user.service'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';





const Register = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const createNewUSer = (event) => {
        event.preventDefault()
        UserApi.createUser(user).then(navigate('/'))
    }
    const updateNewUser = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value });
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
                        name='pass1'
                        placeholder='************'>
                    </input>
                    <input className='RegisterInput'
                        onChange={updateNewUser}
                        type='password'
                        name='pass2'
                        placeholder='************'>
                    </input>
                    <button type="submit">Create User</button>
                </form>
            </div>
            <img className="elipse-blue-down" src={elipseBlueDown} alt="" />
            <img className="elipse-yellow-down" src={elipseYellowDown} alt="" />
        </div>
    );

}

export default Register;