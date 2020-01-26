import React from 'react'
import blogServices from '../services/blogs'

const handleLogIn = async (e, username, setUsername, pass, setPassword, setUser) => {
    e.preventDefault()
    setUser(await blogServices.logIn({username, pass}))
    setUsername('')
    setPassword('')
}

const LogInForm = ({username, password, setUsername, setPassword, setUser}) => {

    return(
        <div>
        <h1>Log in to application</h1>
        <form>
          <div>
            Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div>
            Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <input type="submit" value="Log in" onClick={(e) => handleLogIn(e, username, setUsername, password, setPassword, setUser)}/>
        </form>
      </div>
    )
}

export default LogInForm