import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import homelogo from '../../assets/Boton1.png';
import lupa from '../../assets/lupa.png';
import burger from '../../assets/burger.png';
import notification from '../../assets/notificacion.png';
import './Navbar.css';

function NavBar() {
    const location = useLocation().pathname.toLowerCase();
    const paths = ["/login", "/registerlogin", "/register", "/sucesspayment/", "/cancelpayment/"];

    if (paths.includes(location)) {
        return null
    } else {
        return (
            <>
                <Navbar id="Navbar" fixed="bottom"
                    className="d-flex justify-content-evenly">
                    <div className="d-flex flex-column align-items-center">
                        <Link style={{ color: 'white', textDecoration: 'none', }} className='link-navbar' to='/'>
                            <img src={homelogo} alt="" />
                        </Link>
                        <span>Home</span>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <Link style={{ color: 'white', textDecoration: 'none', }} className='link-navbar' to='/search'>
                            <img src={lupa} alt="" />
                        </Link>
                        <span>Search</span>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <Link style={{ color: 'white', textDecoration: 'none', }} className='link-navbar' to='/'>
                            <img src={notification} alt="" />
                        </Link>
                        <span>Notifications</span>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <Link style={{ color: 'white', textDecoration: 'none', }} className='link-navbar' to='/menu'>
                            <img src={burger} alt="" />
                        </Link>
                        <span>Menu</span>
                    </div>
                </ Navbar>
                <div className='margin-bottom-app'></div>
            </>
        );
    }
}

export default NavBar;