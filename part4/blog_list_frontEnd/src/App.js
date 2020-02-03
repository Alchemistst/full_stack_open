import React, { useState, useEffect } from 'react';
import blogServices from './services/blogs'

//Components
import LogInForm from './components/LogInForm'
import BlogsDisplay from './components/BlogsDisplay'
import NewBlogForm from './components/NewBlogForm'
import Message from './components/Message'
import Togglable from './components/Togglable'


const handleLogOut = (setUser) => {
  window.localStorage.removeItem('blogListUser')
  setUser(null)
  blogServices.logOut()
}

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState({ err: '', mes: null})

  useEffect(() => {
    blogServices.getAll()
      .then(res => {
        res.sort((a,b) => {
          if(a.likes > b.likes){
              return -1
          }
  
          if(a.likes < b.likes){
              return 1
          }
  
          return 0
      })
        setBlogs(res)})
  }, [])

  useEffect(() => {
    const session = JSON.parse(window.localStorage.getItem('blogListUser'))
    if(session){
      setUser(session)
      blogServices.getToken(session.token)
    }
  }, [])

  

  return (
    <div className="App">
      <Message message={message} setMessage={setMessage}/>
      {user === null && 
        <LogInForm 
          username={username} 
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setUser={setUser}
          setMessage={setMessage}
      />}

      {user !== null &&
        <div>
          <h1>{user.name}'s BLOGS</h1>
          
          <button onClick={() => handleLogOut(setUser)}>Log out</button>
          
          <Togglable buttonLabel='New blog'>
            <NewBlogForm 
              blogs={blogs} 
              setBlogs={setBlogs}
              setMessage={setMessage}
            />
          </Togglable>

          <BlogsDisplay blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} user={user.username} />

          
        </div>
      }
      
    </div>
  );
}

export default App;
