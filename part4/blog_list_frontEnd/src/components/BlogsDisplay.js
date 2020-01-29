import React from 'react'
import blogServices from '../services/blogs'

//Components
import Blog from './Blog'

const BlogsDisplay = ({blogs, setBlogs, setMessage}) => {

    //Methods
    const handleLike = async (blog) => {
            await blogServices.addLikes(blog)
            const updatedIndex = blogs.findIndex(b => b === blog)
            let updatedBlogs = [...blogs]
            updatedBlogs[updatedIndex].likes ++
            setBlogs(updatedBlogs)
    }



    return(
        <div>
            {blogs.map(b => <Blog key={b.id} blog={b} handleLike={handleLike}/>)}
        </div>
    )
}

export default BlogsDisplay