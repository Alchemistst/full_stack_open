import React from 'react';
import blogServices from '../services/blogs';
import { useField } from '../hooks/hooksindex'

const handleLogIn = (e, username, password, setUser, setMessage) => {
  e.preventDefault();

  if (username.value === '' || password.value === '') {
    setMessage({
      err: 'error',
      mes: 'Username and password are required.',
    });
    return;
  }

  blogServices.logIn({ username: username.value, pass: password.value })
    .then(user => {
      setUser(user);
      window.localStorage.setItem('blogListUser', JSON.stringify(user));
    })
    .catch( err => {
      setMessage({
        err: 'error',
        mes: err.response.data.error,
      })
    })

  username.onChange();
  password.onChange();
};

const LogInForm = ({setUser, setMessage}) => {

  const username = useField('text')
  const password = useField('password')

  return (
    <div className="LogInForm">
      <h1>Log in to application</h1>
      <form>
        <div>
              Username:

          <input {...username} />
        </div>
        <div>
              Password:

          <input {...password} />
        </div>
        <input 
          type="submit" 
          value="Log in" 
          onClick={(e) => handleLogIn(e, username, password, setUser, setMessage)} />
      </form>
    </div>
  );
};

export default LogInForm;
