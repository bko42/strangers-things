import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPosts, updatePost, } from '../api'

const EditPost = ({ posts, token, setPosts, navigate }) => {
    
    const { postID } = useParams();
    console.log(posts)

    const [currentPost] = posts.filter(post => post._id === postID);
    const {title, description, location, price, willDeliver} = currentPost;

    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [newPrice, setNewPrice] = useState(price);
    const [newLocation, setNewLocation] = useState(location);
    const [newWillDeliver, setNewWillDeliver] = useState(willDeliver);

    async function editPost(){
        const updatedPost = {
            title: newTitle,
            description: newDescription,
            price: newPrice,
            location: newLocation,
            willDeliever: newWillDeliver,
            _id: postID
        }
        await updatePost(token, updatedPost)
        console.log(updatedPost)
    }


    return (
        
        <div>
            <input
                type='text'                
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                />
            <input
                type='text'
                value={newDescription}
                onChange={(event) => setNewDescription(event.target.value)}
                />
             <input
                type='text'
                value={newPrice}
                onChange={(event) => setNewPrice(event.target.value)}
                />
             <input
                type='text'
                value={newLocation}
                onChange={(event) => setNewLocation(event.target.value)}
                />
             <span>Will Deliver</span>   
             <input
                type='checkbox'
                checked = {newWillDeliver}
                onChange={(event) => setNewWillDeliver(!newWillDeliver)}
                />    
                
                <button onClick={async(event) => { 
                        event.preventDefault();
                        editPost()
                        const results = await getPosts(token)
                        setPosts(results.data.posts);
                        navigate (`/posts/${postID}`)
                        }}>Edit Post</button> 
            
        </div>

    )
}

export default EditPost;
