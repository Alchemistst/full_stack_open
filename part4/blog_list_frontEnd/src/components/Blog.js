import React from 'react'

const Blog = ({blog}) => {
    return(
        <div>
            <h2>{blog.title}</h2>
            <div> by {blog.author}</div>
            <hr/>
        </div>
    )
}

export default Blog