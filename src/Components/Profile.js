import React from 'react';

const Profile = ({ user }) => {
    const messages = user.messages;
    const userID = user._id;
    console.log(messages, userID);

    return (
        <div>
            <div>
                <h1>Message Inbox</h1>
        {
            messages && messages.map(message => {
                const fromUserID = message.fromUser._id;
                const {username} = message.fromUser;
                const {postTitle} = message.post.title;
                const {postID} = message.post._id
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
        </div>
    )
}

export default Profile;