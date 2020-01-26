import React, { useState, useEffect } from 'react';
import blogServices from './services/blogs'

//Components
import LogInForm from './components/LogInForm'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'

const logOut = (e, setUser) => {
  e.preventDefault()
  window.localStorage.removeItem('blogListUser')
  setUser(null)
}

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogServices.getAll()
      .then(res => setBlogs(res))
  }, [])

  useEffect(() => {
    const session = JSON.parse(window.localStorage.getItem('blogListUser'))
    setUser( session ? session : null )
    blogServices.getToken(session.token)
  }, [])

  

  return (
    <div className="App">
      {user === null && 
        <LogInForm 
          username={username} 
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setUser={setUser}
      />}

      {user !== null &&
        <div>
          <h1>{user.name}'s BLOGS</h1>
          <button onClick={(e) => logOut(e, setUser)}>Log out</button>
          <NewBlogForm blogs={blogs} setBlogs={setBlogs}/>
          {blogs.map(b => <Blog key={b.id} blog={b} />)}
        </div>
      }
      
    </div>
  );
}

export default App;
