import { Link } from "react-router-dom";
import './MenuPage.css';
import { AuthContext } from '../../context/auth.context';
import { useContext } from "react";

const Menu = () => {
    const { logOut, user } = useContext(AuthContext);
    return (
        <>
            <div>
                <div className="menu-link"><Link to='/user/wishList'>My wishList</Link></div>
                <div className="menu-link"><Link to='/user/catalog'>Catalog</Link></div>
                <div className="menu-link"><Link to='/user/mygifts'>Mygifts</Link></div>
                <div className="menu-link"><Link to='/user/shop'>My Shop</Link></div>
                {user &&
                    <>
                        <div className="menu-link"><Link to='/profile'>Profile</Link></div>
                        <div className="menu-link"><Link to='/' onClick={logOut}>Logout</Link></div>
                    </>}
            </div>
        </>
    );

}

export default Menu;