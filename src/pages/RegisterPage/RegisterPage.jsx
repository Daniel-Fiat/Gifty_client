import './RegisterPage.css'
import elipseBlueUp from '../../assets/ElipseAzulArriba.png';
import elipsePinkUp from '../../assets/ElipseRosaArriba.png';
import elipseBlueDown from '../../assets/ElipseAzulAbajo.png';
import elipseYellowDown from '../../assets/ElipseAmarillaAbajo.png';

const Register = () => {

    return (
        <div className='register-form-container'>
            <img className="elipse-blue-up" src={elipseBlueUp} alt="" />
            <img className="elipse-pink-up" src={elipsePinkUp} alt="" />
            <div id="register-form">
                <h1>Register</h1>
                <form action="" method="post">
                    <input className='RegisterInput' type="text"></input>
                    <input className='RegisterInput' type="password"></input>
                    <input className='RegisterInput' type="password"></input>
                    <button type="submit">Create User</button>
                </form>
            </div>
            <img className="elipse-blue-down" src={elipseBlueDown} alt="" />
            <img className="elipse-yellow-down" src={elipseYellowDown} alt="" />
        </div>
    );

}

export default Register;