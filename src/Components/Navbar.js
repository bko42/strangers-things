import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = ({ logout, token }) => {
    return (
        <header>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/posts'>Posts</Link>
                <Link to='/profile'>Profile</Link>

{/* Shows register and login if no token, shows logout with token. */}
                {
                    token ? (
                        <>
                        <Link to='/create-post'>Create Post</Link>
                        <Link to='/' onClick={() => logout() }>Logout</Link>
                        </>
                    ) : (
                        <>
                        <Link to='/register'>Register</Link>
                        <Link to='/login'>Login</Link>
                        </>
                    )
                }

                  
            </nav>
        </header>
    )
}

export default Navbar;