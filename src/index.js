import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom'
import './style.css'
// import Navbar from './Components/Navbar.js'
// import Posts from './Components/Posts.js'
// import Profile from './Components/Profile.js'
import {
    Home,
    Navbar,
    Posts,
    Profile,
    Register,
    Login,
} from './Components';
import {
    getPosts
} from './api';


const App = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    console.log(token)

    async function fetchPosts() { 
    const results = await getPosts()
    console.log(results)
    setPosts(results.data.posts)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <div>
            <Navbar />
            <Routes>
                {
                    // new Route setup
                }
                <Route path='/' element={<Home />} />
                <Route path='/posts' element={<Posts posts={posts}/>} />
                <Route path='/profile' element={<Profile />} />
                <Route 
                    path='/register' 
                        element={<Register 
                        setToken={ setToken }
                        token={token}
                        navigate={navigate}/>} 
                    />
                <Route
                path='login'
                element={<Login
                    setToken={ setToken }
                    navigate={ navigate }
                    />}
                />
            </Routes>
            
        </div>
    )
}

const container = document.querySelector('#container');
const root = ReactDOM.createRoot(container);
root.render (
    <BrowserRouter>
        <App />
    </BrowserRouter>   
    );

/*
Login
Registration
Posts
Profile
Navbar
AddPost

*/