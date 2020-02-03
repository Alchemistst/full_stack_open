import React, { useState } from 'react'

const Blog = ({blog, handleLike, permission, handleDelete}) => {
    //State
    const [displayInfo, setDisplayInfo] = useState(false)

    //vars and consts
    const showNHide = displayInfo ? '(hide)' : '(show)'

    //Methods
    const toggleVisibility = () => {
        setDisplayInfo(!displayInfo)
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
                <div>likes: {blog.likes} <button onClick={()=>handleLike(blog)}>Like</button></div>
                <div>Added by {blog.user.name}</div>
                {permission && 
                    <button onClick={() => handleDelete(blog)}>Delete</button>
                }
            </div>
            }
            <hr/>
        </div>
    )
}

export default Blog