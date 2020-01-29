import React from 'react'
import { useState } from 'react'
import blogServices from '../services/blogs'



const NewBlogForm = ({blogs, setBlogs, setMessage, toggleVisibility}) => {

    //State
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    //Methods
    const handleCreate = async (e) => {
        e.preventDefault()

        try{
            const newBlog = {
                title,
                author,
                url
            }

            const blogsUpdated = [...blogs]
            
            newBlog.author = newBlog.author || 'anonymous'
    
            blogsUpdated.push(await blogServices.newBlog(newBlog))
            
            setBlogs(blogsUpdated)
            
            setMessage({
                err: 'message',
                mes: `Added ${newBlog.title} by ${newBlog.author}.`
            })
            
            setTitle('')
            setAuthor('')
            setUrl('')
            toggleVisibility()
        }catch(err){
            setMessage({
                err: 'error',
                mes: err.response.data.error
            })
        }    
    }

    return(
        <div>
            <h1>Create new</h1>
            <form>
                <div>
                    Title: <input type='text' value={title} onChange={e => setTitle(e.target.value)}/>
                </div>
                <div>
                    Author: <input type='text' value={author} onChange={e => setAuthor(e.target.value || 'anonymous')}/>
                </div>
                <div>
                    Url: <input type='text' value={url} onChange={e => setUrl(e.target.value)}/>
                </div>
                <input type='submit' value='Create' onClick={e => handleCreate(e)}/>
            </form>
        </div>
    )
}

export default NewBlogForm