import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { deletePost, createMessage, } from '../api';

const SendMessage = ({ postID, token }) => {
    const [message, setMessage] = useState({ content: '' });
    // we need 3 things to make this request
    // Post-id, token, message object containing the content of hte message

    async function addMessage() {
        await createMessage({ postID, token, message })
    }

    return (
        <form onSubmit={(event) => {

            event.preventDefault();
            addMessage();
        }}>
            <input
                type='text'
                placeholder='Enter Message'
                onChange={(event) => setMessage({ content: event.target.value })}
            />
            <button type='submit'>Send Message</button>
        </form>
    )
}

const SinglePostView = ({ posts, token, navigate, }) => {
    const [activateMessage, setActivateMessage] = useState(false);
    const { postID } = useParams();

    if (posts.length) {
        const [currentPost] = posts.filter(post => post._id === postID);
        if (!currentPost) {
            return (
                <div>
                    <h1>Post Not Found</h1>
                    <h2>This post no longer exists!</h2>
                    <button><Link to='/profile'>Back to Profile</Link></button>
                </div>
            )
        }
        const { title, description, location, price, willDeliver, isAuthor, } = currentPost;

        return (
            <div className='singlePost'>
                <div>
                    <h3 id='postTitle'>{title}</h3>
                    <p>Description: {description}</p>
                    <p>Price: {price}</p>
                    <p>Location: {location}</p>
                    <p>Will Deliver: {willDeliver}</p>
                </div>
                <button onClick={() => setActivateMessage(!activateMessage)}>Message this user</button>
                {
                    activateMessage && <SendMessage postID={postID} token={token} />
                }
                {
                    isAuthor? (
                <>
                <button onClick={async (event) => {
                event.preventDefault();                                    
                deletePost(token, { _id })                                                    
                const results = await getPosts(token)                                                    
                setPosts(results.data.posts);                                                    
                navigate(`/profile`);          
                }}>Delete Post</button>
                </>
                    ) : (
                        null
                    )
                }
            </div>
        )
    } else {
        return (
            <h1>Waiting for posts...</h1>
        )
    }
    
}

export default SinglePostView;
