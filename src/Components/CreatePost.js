import React, { useState } from 'react';
import { createPost, getPosts } from '../api'

const CreatePost = ({token, setPosts, navigate}) => {

const [title, setTitle] = useState('')  
const [description, setDescription] = useState('')
const [price, setPrice] = useState('')
const [location, setLocation] = useState('')
const [willDeliver, setWillDeliver] = useState(false)


    async function addPost() {
        const newPost = {
            title,
            description,
            price,
            location,
            willDeliver,
        }
        const result = await createPost(token, newPost)
        
        const results = await getPosts(token)
    setPosts(results.data.posts);
    navigate (`/posts`)
    //navigate (`/posts/${results.data.post._id}`)
        

    }
    return (
        <div>
            <input
                type='text'                
                placeholder='Title'
                onChange={(event) => setTitle(event.target.value)}
                />
            <input
                type='text'
                placeholder='Description'
                onChange={(event) => setDescription(event.target.value)}
                />
             <input
                type='text'
                placeholder='Price'
                onChange={(event) => setPrice(event.target.value)}
                />
             <input
                type='text'
                placeholder='Location'
                onChange={(event) => setLocation(event.target.value)}
                />
             <span>Will Deliver</span>   
             <input
                type='checkbox'
                checked = {willDeliver}
                onChange={(event) => setWillDeliver(!willDeliver)}
                />    
                <button onClick={() => addPost()}>Create a New Post</button> 
            
        </div>

        
    
       
    )

}

export default CreatePost;