import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '../../images/logo.png'
import './Header.css'
const Header = () => {
    const {user,logOut} = useAuth();
    return (
        <div className="header">
            <img className="logo" src={logo} alt="" />
            <nav>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/reviews">Order Review</NavLink>
                <NavLink to="/inventory">Manage Inventory Here</NavLink>
                {user.email && <span style={{color : 'white'}} >{user.displayName}</span> }

                {
                    user.email ? <NavLink onClick={logOut} to="/"> Log out</NavLink> : <NavLink to="/login">Login</NavLink>
                }
                
            </nav>
        </div>
    );
};

export default Header;