import React from 'react';
import { createPost } from '../api'

const CreatePost = ({ token }) => {
    const newPost = {
        title: 'test post',
        description: 'testing',
        price: 'free',
        location: 'NY',
        willDeliver: false,
    }

    async function addPost() {
        const result = await createPost(token, newPost)
    }
    return (
    <button onClick={() => addPost()}>Create a New Post</button> 
    )

}

export default CreatePost;