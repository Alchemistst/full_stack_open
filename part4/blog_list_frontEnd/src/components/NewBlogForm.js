import React from 'react'

const NewBlogForm = () => {
    return(
        <div>
            <h1>Create new</h1>
            <form>
                <div>
                    Title: <input />
                </div>
                <div>
                    Author: <input/>
                </div>
                <div>
                    Url: <input/>
                </div>           
            </form>
        </div>
    )
}

export default NewBlogForm