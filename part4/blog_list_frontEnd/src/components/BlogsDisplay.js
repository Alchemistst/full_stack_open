import React from 'react'
import blogServices from '../services/blogs'

//Components
import Blog from './Blog'

const BlogsDisplay = ({blogs, setBlogs, setMessage, user}) => {

    //Methods
    const handleLike = async (blog) => {
        try{
            await blogServices.addLikes(blog)
            const updatedIndex = blogs.findIndex(b => b === blog)
            let updatedBlogs = [...blogs]
            updatedBlogs[updatedIndex].likes ++
            setBlogs(updatedBlogs)
        }catch(err){
            setMessage({
                err: 'error',
                mes: err.response.data.error
            })
        }
    }
    const handleDelete = async (blog) => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)){
            try{
                await blogServices.deleteBlog(blog)
                const updatedBlogs = [...blogs]
                updatedBlogs.splice(updatedBlogs.indexOf(blog), 1)
                setBlogs(updatedBlogs)
            }catch(err){
                setMessage({
                    err: 'error',
                    mes: err.response.data.error
                })
            }
        }
        
    }

    return(
        <div>
            {blogs.map(b =><Blog 
                                key={b.id} 
                                blog={b} 
                                handleLike={handleLike}
                                permission={b.user.username === user}
                                handleDelete={handleDelete}/>)}
        </div>
    )
}

export default BlogsDisplay