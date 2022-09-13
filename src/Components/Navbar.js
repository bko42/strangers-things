import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = ({ logout, token }) => {
    return (
        <div className='topBar'>
        <header>
            <h1 className='header'>Stranger's Things</h1>
            <nav className='navbar'>
            <button className='navButton'><Link to='/'>Home</Link></button>
            <button className='navButton'><Link to='/posts'>Posts</Link></button>
                

{/* Shows register and login if no token, shows logout with token. */}
                {
                    token ? (
                        <>
                        <button className='navButton'>
                            <Link to='/create-post'>Create Post</Link>
                        </button>
                        <button className='navButton'>
                            <Link to='/profile'>Profile</Link>
                        </button>
                        <button className='navButton'>
                            <Link to='/' onClick={() => logout() }>Logout</Link>
                        </button>
                        </>
                    ) : (
                        <>
                        <button className='navButton'>
                            <Link to='/register'>Register</Link>
                        </button>
                        <button className='navButton'>
                            <Link to='/login'>Login</Link>
                        </button>
                        </>
                    )
                }

                  
            </nav>
        </header>
       </div> 
    )
}

export default Navbar;