import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = ({ setToken }) => {
    return (
        <header>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/posts'>Posts</Link>
                <Link to='/profile'>Profile</Link>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
                <Link to='/' 
                    onClick={() => logout() }>Logout</Link>
                  
            </nav>
        </header>
    )
}

export default Navbar;