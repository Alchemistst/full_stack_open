import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// Components
import LogInForm from './components/LogInForm';
import BlogsDisplay from './components/BlogsDisplay';
import Users from './components/Users';
import User from './components/User';
import Blog from './components/Blog';
import Navbar from './components/Navbar';

// Reducers
import { initBlogs } from './reducers/blogsReducer';
import { initUser } from './reducers/userReducer';


function App({
  user, initBlogs, initUser,
}) {
  useEffect(() => {
    initUser();
  }, [initUser]);

  useEffect(() => {
    if (user) initBlogs();
  }, [user, initBlogs]);


  return (
    <div className="App">
      <Router>
        {user === null
        && (
        <div>
          <Route path="/" render={() => <LogInForm />} />
        </div>
        )}
        {user !== null
          && (
          <div>
            <Navbar />
            <Route exact path="/"><Redirect to="/blogs" /></Route>
            <Route exact path="/blogs" render={() => <BlogsDisplay />} />
            <Route exact path="/users" render={() => <Users />} />
            <Route path="/users/:id" render={({ match }) => <User id={match.params.id} />} />
            <Route path="/blogs/:id" render={({ match }) => <Blog id={match.params.id} />} />
            <Route path="/login"><Redirect to="/blogs" /></Route>
          </div>
          )}
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});


export default connect(mapStateToProps, { initBlogs, initUser })(App);
