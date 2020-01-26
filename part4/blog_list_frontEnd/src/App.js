import React, { useState, useEffect } from 'react';
import blogServices from './services/blogs'

//Components
import LogInForm from './components/LogInForm'
import Blog from './components/Blog'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogServices.getAll()
      .then(res => setBlogs(res))
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
          <h1>{user.username}'s BLOGS</h1>
          {blogs.map(b => <Blog key={b.id} blog={b} />)}
        </div>
      }
      
    </div>
  );
}

export default App;
