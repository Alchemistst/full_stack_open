import React, { useState } from 'react'
import blogServices from '../services/blogs'

const Blog = ({blog, setMessage}) => {
    //State
    const [displayInfo, setDisplayInfo] = useState(false)
    const [likes, setLikes] = useState(blog.likes)

    //vars and consts
    const showNHide = displayInfo ? '(hide)' : '(show)'

    //Methods
    const toggleVisibility = () => {
        setDisplayInfo(!displayInfo)
    }
    const handleLike = (blog) => {
        try{
            blogServices.addLikes(blog)
            setLikes(likes + 1)
        }catch(err){
            setMessage({
                err: 'error',
                mes: err.response.data.error
            })
        }
    }

    return(
        <div>
            <span style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginRight: '5px'
            }}>{blog.title}</span>
            <span style={{cursor:'pointer'}} onClick={()=> toggleVisibility()}>{showNHide}</span>
            {displayInfo && 
            <div>
                <div>{blog.url}</div>
                <div>likes: {likes} <button onClick={()=>handleLike(blog)}>Like</button></div>
                <div>Added by {blog.user.name}</div>
            </div>
            }
            <hr/>
        </div>
    )
}

export default Blog