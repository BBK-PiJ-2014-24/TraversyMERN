import React, {Fragment, useContext} from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from '../../context/auth/authContext';
import ContactContext from "../../context/contact/contactContext";


function Navbar({ title, icon }) {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const {isAuthenticated, logout, user} = authContext;
  const {clearContacts} = contactContext;

  const onLogout = () => {
    logout();
    clearContacts();
  };


  const authLinks = (
    <Fragment>
       <li> Hello {user && user.name}</li>
       <li>
          <a onClick={onLogout} href='#!'>
            <i className='fas fa-sign-out-alt'></i> <span className='hide-sm'>Logout</span>
          </a> 
        </li>
    </Fragment>
  );

  const guessLinks = (
    <Fragment>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        {isAuthenticated ? authLinks : guessLinks}
      </ul>
    </div>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Contact-Keeper",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
