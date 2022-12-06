import { Link } from "react-router-dom";
import './MenuPage.css';
import { AuthContext } from '../../context/auth.context';
import { useContext } from "react";

const Menu = () => {
    const { logOut, user } = useContext(AuthContext);
    return (
        <>
            <div>
                <div className="menu-link"><Link to='/'>My data</Link></div>
                <div className="menu-link"><Link to='/user/wishList'>My wishList</Link></div>
                <div className="menu-link"><Link to='/user/catalog'>Catalog</Link></div>
                <div className="menu-link"><Link to='/'>Configuration</Link></div>
                <div className="menu-link"><Link to='/'>Help</Link></div>
                {user ?
                    (<div className="menu-link"><Link to='/' onClick={logOut}>Logout</Link></div>)
                    :
                    (<div className="menu-link"><Link to='/register'>Register</Link></div>)
                }
            </div>
        </>
    );

}

export default Menu;