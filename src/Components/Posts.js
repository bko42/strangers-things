import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Posts = ({ posts }) => {
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
                    <p>Will Deliver: {willDeliver}</p>
                    {
                        price === 'free' ? (
                            <button>This is Free</button>
                        ) : (
                            <button>View</button>
                        )
                    }
                    {
                        isAuthor ? (
                            <button>You are the author</button>
                        ) : (
                            <Link to ={`/posts/${_id}`}>View</Link>
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