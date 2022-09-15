import React from 'react';
import { Link } from 'react-router-dom';
import { getPosts, deletePost } from '../api'

const Profile = ({ user, posts, setPosts, token }) => {
    const messages = user.messages;
    const userID = user._id;
    // console.log(messages, userID);

    // const results = await getPosts(token)
    // setPosts(results.data.posts);


    return (
        <div>
            <div>
                <h1>Message Inbox</h1>
                <div className='posts'>
                {
                    messages && messages.map(message => {
                        const fromUserID = message.fromUser._id;
                        const { username } = message.fromUser;
                        const { title } = message.post;
                        const { _id } = message.post;
                        if (userID !== fromUserID) {
                            return (
                                <div className='post' key={message._id}>
                                    <p>From User: {username}</p>
                                    <p className='about'>About: {title}</p>
                                    <p>Message: {message.content}</p>
                                    <button><Link to={`/posts/${ _id }`}>View Post</Link></button>
                                </div>
                            )
                        }
                    })
                }
                </div>
            </div>
            <div>
                <h1>Message Outbox</h1>
                <div className='posts'>
                {
                    messages && messages.map((message, idx) => {
                        const fromUserID = message.fromUser._id;
                        const { title } = message.post;
                        const { _id } = message.post;
                        if (userID === fromUserID) {
                            return (
                                <div className='post' key={idx}>
                                    <p className='about'>About: {title}</p>
                                    <p>{message.content}</p>
                                    <button><Link to={`/posts/${ _id }`}>View Post</Link></button>
                                </div>
                            )
                        }
                    })
                }
                </div>
            </div>
            <h1>My Posts</h1>
            <div className='posts'>
                {posts.map((post, index) => {
                    const { description, location, price, willDeliver, title, _id, isAuthor } = post;
                    if (isAuthor) {
                        return (
                            
                                <div className='post' key={index}>
                                    <h3 className='postTitle'>{title}</h3>
                                    <p>Description: {description}</p>
                                    <p>Price: {price}</p>
                                    <p>Location: {location}</p>
                                    {willDeliver ? <p>Will Deliver</p> : <p>Pickup Only</p>}
                                    <div>
                                        <button><Link to={`/posts/${ _id }`}>View Post</Link></button>
                                        <button><Link to={`/posts/edit-post/${_id}`}>Edit</Link></button>
                                        <button onClick={async (event) => {
                                            event.preventDefault();
                                            deletePost(token, { _id })
                                            const results = await getPosts(token)
                                            setPosts(results.data.posts);
                                            location.reload;
                                        }}>Delete Post</button>
                                    </div>
                                </div>
                            

                        )
                    }
                })
                }

            </div>
        </div>
    )
}

export default Profile;