import { Link } from "react-router-dom";
import './MenuPage.css';
import { AuthContext } from '../../context/auth.context';
import { useContext } from "react";

import arrow from '../../assets/arrow.png';

const Menu = () => {
    const { logOut, user } = useContext(AuthContext);
    return (
        <>
            <div className="menu-page-container">
                {user && <h1>User: {user.email}</h1>}
                <Link to='/user/wishList'><div className="menu-link">My wishList<img src={arrow} alt="arrow.png"></img></div></Link>
                <Link to='/user/catalog'><div className="menu-link">Catalog<img src={arrow} alt="arrow.png"></img></div></Link>
                <Link to='/user/shop'><div className="menu-link">My Shop<img src={arrow} alt="arrow.png"></img></div ></Link>
                {
                    user ?
                        <>
                            <Link to='/' onClick={logOut}><div className="menu-link">Logout<img src={arrow} alt="arrow.png"></img></div></Link>
                        </>
                        :
                        <Link to='/RegisterLogin'><div className="menu-link">Login<img src={arrow} alt="arrow.png"></img></div></Link>
                }
            </div>
        </>
    );

}

export default Menu;