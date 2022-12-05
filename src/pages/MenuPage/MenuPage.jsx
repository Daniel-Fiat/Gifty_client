import { Link } from "react-router-dom";
import './MenuPage.css';

const Menu = () => {

    return (
        <>
            <div>
                <div className="menu-link"><Link to='/'>My data</Link></div>
                <div className="menu-link"><Link to='/'>My presents</Link></div>
                <div className="menu-link"><Link to='/'>Configuration</Link></div>
                <div className="menu-link"><Link to='/'>Help</Link></div>
                <div className="menu-link"><Link to='/'>Logout</Link></div>
                <div className="menu-link"><Link to='/register'>Register</Link></div>
            </div>
        </>
    );

}

export default Menu;