import React, { Fragment } from 'react';

const Posts = ({ posts }) => {
    //const { posts } = props

    return (
        <div>
        {
            posts.map((post) => {
            const {description, location, price, title, _id} = post;
            return (
                <Fragment key={_id}>
                    <h3>{title}</h3>
                    <p>Description: {description}</p>
                    <p>Price: {price}</p>
                    <p>Location: {location}</p>
                </Fragment>
             )   
            })
        }
        </div>
    )
}

export default Posts;