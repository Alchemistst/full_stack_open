import React from 'react'
import blogServices from '../services/blogs'

const handleLogIn = async (e, props) => {
  e.preventDefault()
  
  if(props.username === '' || props.password === ''){
    return props.setMessage({
      err: 'error',
      mes: 'Username and password are required.'
    })
  }

  try{
    
    const user = await blogServices.logIn({ username : props.username, pass : props.password})
    props.setUser(user)

    window.localStorage.setItem('blogListUser', JSON.stringify(user))

    props.setUsername('')
    props.setPassword('')
  }catch(err){
    props.setMessage({
      err: 'error',
      mes: err.response.data.error
    })
  }
    
}

const LogInForm = (props) => {

    return(
        <div>
        <h1>Log in to application</h1>
        <form>
          <div>
            Username: <input type="text" value={props.username} onChange={(e) => props.setUsername(e.target.value)}/>
          </div>
          <div>
            Password: <input type="password" value={props.password} onChange={(e) => props.setPassword(e.target.value)} />
          </div>
          <input type="submit" value="Log in" onClick={(e) => handleLogIn(e, props)}/>
        </form>
      </div>
    )
}

export default LogInForm