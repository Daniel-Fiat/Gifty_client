import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import homelogo from '../../assets/Boton1.png';
import lupa from '../../assets/lupa.png';
import perfil from '../../assets/perfil.png';
import notificacion from '../../assets/notificacion.png';
import regalos from '../../assets/regalos.png';
import './Navbar.css';
import { useEffect, useState } from 'react';

function NavBar() {
    const layout = localStorage.getItem("Navbar")
    return (
        <Navbar id="Navbar" fixed="bottom"
            className={layout ? "d-flex justify-content-evenly" : "nondisplay"} >
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
                <Link style={{ color: 'white', textDecoration: 'none', }} className='link-navbar' to='/profile'>
                    <img src={perfil} alt="" />
                </Link>
                <span>Perfil</span>
            </div>
            <div className="d-flex flex-column align-items-center">
                <Link style={{ color: 'white', textDecoration: 'none', }} className='link-navbar' to='/menu'>
                    <img src={perfil} alt="" />
                </Link>
                <span>Menu</span>
            </div>
        </Navbar>
    );
}

export default NavBar;