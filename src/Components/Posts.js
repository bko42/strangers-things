import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { deletePost, getPosts } from '../api';


const Posts = ({ posts, token, setPosts, navigate }) => {
    //const { posts } = props

    // const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const postMatches = (post, string) => {
        const { title, description } = post;

        if ((title.includes(string)) || description.includes(string)) {
            return post;
        }

    }



    const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
    const postsToDisplay = searchTerm.length ? filteredPosts : posts;

    return (
        <div>
            <div className='Search'>
                <form onSubmit={(event) => {
                    event.preventDefault();

                }}>
                    <input
                        type='text'
                        placeholder='search term here'
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                </form>
            </div>

            {
                postsToDisplay.map((post) => {
                    const { description, location, price, willDeliver, title, _id, isAuthor } = post;
                    return (
                        <div className='posts' key={_id}>
                            <h3>{title}</h3>
                            <p>Description: {description}</p>
                            <p>Price: {price}</p>
                            <p>Location: {location}</p>
                            {willDeliver ? <p>Will Deliver</p> : <p>Pickup Only</p>}
                            <div>
                                {

                                    <button><Link to={`/posts/${_id}`}>View</Link></button>
                                }
                                {
                                    isAuthor ? (
                                        <>
                                            <button><Link to={`/posts/edit-post/${_id}`}>Edit</Link></button>
                                            <button onClick={async(event) => {
                                                event.preventDefault();
                                                deletePost(token, { _id })
                                                const results = await getPosts(token)
                                                setPosts(results.data.posts);
                                                navigate (`/posts`);
                                                location.reload;
                                            }}>Delete Post</button>
                                        </>
                                    ) : (
                                        null
                                    )

                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Posts;