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
    CreatePost,
    SinglePostView,
    EditPost,
} from './Components';
import {
    getPosts,
    getUserDetails
} from './api';


const App = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});

    const navigate = useNavigate();
    

    function logout() {window.localStorage.removeItem('token');
    setToken('');
    setUser({});
    }

    async function fetchPosts() { 
    const results = await getPosts(token)
    console.log(results)
    setPosts(results.data.posts);
    }


    async function getMe() {
        const storedToken = window.localStorage.getItem('token');
        if (!token){
            setToken(storedToken)
            return;
        }
        
        const results = await getUserDetails(token)
        if (results.success) {
            setUser(results.data);
        } else {
            console.log(results.error.message);
        }    
    }

    useEffect(() => {
        fetchPosts()
    }, [token]) 
    
    useEffect(() => {
        getMe();   
    }, [token])

    return (
        <div>
            <Navbar logout={ logout } token={token} />
            <Routes>
                {
                    // new Route setup
                }
                <Route path='/' element={<Home />} />
                <Route path='/posts' 
                    element={<Posts 
                    token={token} 
                    posts={posts} 
                    setPosts={setPosts}
                    navigate={navigate}
                    />} 
                />
                <Route 
                    path='/posts/:postID'
                    element={<SinglePostView 
                        posts={posts} 
                        token={token}
                        />}
                />
                <Route exact path='/posts/edit-post/:postID'
                    element={<EditPost 
                    token={token}
                    posts={posts}
                    setPosts={setPosts}
                    navigate={navigate}
                    />}
                />
                <Route path='/profile' 
                element={<Profile
                user={user}
                posts={posts}
                setPosts={setPosts}
                navigate={navigate}
                token={token}
                />} />
                <Route
                    path='/create-post'
                    element={<CreatePost 
                    token={ token } 
                    setPosts={setPosts}
                    navigate={navigate}/> }
                />
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