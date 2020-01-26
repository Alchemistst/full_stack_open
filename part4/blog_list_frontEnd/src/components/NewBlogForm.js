import React from 'react'
import { useState } from 'react'
import blogServices from '../services/blogs'

const handleCreate = async (e, newBlog, setters, blogs, setBlogs) => {
    e.preventDefault()
    
    const blogsUpdated = [...blogs]
    blogsUpdated.push(await blogServices.newBlog(newBlog))
    setBlogs(blogsUpdated)
    
    setters.setTitle('')
    setters.setAuthor('')
    setters.setUrl('')

    
}

const NewBlogForm = ({blogs, setBlogs}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const newBlog = {
        title,
        author,
        url
    }

    const setters = {
        setTitle,
        setAuthor,
        setUrl
    }

    return(
        <div>
            <h1>Create new</h1>
            <form>
                <div>
                    Title: <input type='text' value={title} onChange={e => setTitle(e.target.value)}/>
                </div>
                <div>
                    Author: <input type='text' value={author} onChange={e => setAuthor(e.target.value)}/>
                </div>
                <div>
                    Url: <input type='text' value={url} onChange={e => setUrl(e.target.value)}/>
                </div>
                <input type='submit' value='Create' onClick={e => handleCreate(e, newBlog, setters, blogs, setBlogs)}/>
            </form>
        </div>
    )
}

export default NewBlogForm