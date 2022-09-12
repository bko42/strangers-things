import React from 'react';
import { Link } from 'react-router-dom';
import { getPosts, deletePost } from '../api'

const Profile = ({ user, posts, setPosts, token }) => {
    const messages = user.messages;
    const userID = user._id;
    console.log(messages, userID);
    
    // const results = await getPosts(token)
    // setPosts(results.data.posts);


    return (
        <div>
            <div>
                <h1>Message Inbox</h1>
                {
                    messages && messages.map(message => {
                        const fromUserID = message.fromUser._id;
                        const { username } = message.fromUser;
                        const { postTitle } = message.post.title;
                        const { postID } = message.post._id
                        if (userID !== fromUserID) {
                            return (
                                <div key={message._id}>
                                    <p>From User: {username}</p>
                                    <p>About {postTitle}</p>
                                    <p>Message: {message.content}</p>
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div>
                <h1>Message Outbox</h1>
                {
                    messages && messages.map((message, idx) => {
                        const fromUserID = message.fromUser._id;
                        if (userID === fromUserID) {
                            return (
                                <div key={idx}>{message.content}</div>
                            )
                        }
                    })
                }
            </div>
            <div>
                {posts.map((post, idx) => {
                    const { description, location, price, willDeliver, title, _id, isAuthor } = post;
                    if (isAuthor) {
                        return (
                            <>
                                <div className='posts' key={idx}>
                                    <h3>{title}</h3>
                                    <p>Description: {description}</p>
                                    <p>Price: {price}</p>
                                    <p>Location: {location}</p>
                                    {willDeliver ? <p>Will Deliver</p> : <p>Pickup Only</p>}
                                </div>
                                <div>
                                    <button><Link to={`/posts/edit-post/${_id}`}>Edit</Link></button>
                                    <button onClick={async(event) => {
                                            event.preventDefault();
                                            deletePost(token, { _id })
                                            const results = await getPosts(token)
                                            setPosts(results.data.posts);
                                            location.reload;
                                            }}>Delete Post</button>
                                </div>              
                            </>
                            
                        )
                    }
                })
                }

            </div>
        </div>
    )
}

export default Profile;