import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { deletePost } from '../api';


const Posts = ({ posts, token }) => {
    //const { posts } = props

    return (
        <div>

        {
            posts.map((post) => {
            const {description, location, price, willDeliver, title, _id, isAuthor} = post;
            return (
                <div key={_id}>
                    <h3>{title}</h3>
                    <p>Description: {description}</p>
                    <p>Price: {price}</p>
                    <p>Location: {location}</p>
                    {willDeliver ? <p>Will Deliver</p> : <p>Pickup Only</p>}
                    {/* {
                        price === 'free' ? (
                            <button>This is Free</button>
                        ) : (
                            <button>View</button>
                        )
                    } */}
                    {
                        <Link to ={`/posts/${_id}`}>View</Link>
                    }
                    {
                        isAuthor ? (
                            <>
                            <Link to={`/posts/edit-post/${_id}`}>Edit</Link>
                            <button onClick={(event) => {
                                event.preventDefault(); 
                                deletePost(token, {_id})}}>Delete Post</button>
                            </>
                        ) : (
                            null
                        )
                    }
                </div>
             )   
            })
        }
        </div>
    )
}

export default Posts;