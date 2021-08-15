import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar(props){

    return (
     <nav className='navbar bg-primary'>
         <h1>
            <i className={props.icon} /> {props.title}
         </h1>
         <ul>
             <NavLink to='/'>Home</NavLink> 
             <NavLink to='/about'>About</NavLink> 
         </ul>
     </nav>
    );
}

Navbar.defaultProps = {
     title: 'Github Finder',
     icon: 'fab fa-github'
 };

Navbar.propTypes = {
     title: PropTypes.string.isRequired,
     icon: PropTypes.string.isRequired,
 };

export default Navbar;