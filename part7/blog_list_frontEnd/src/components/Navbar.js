import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Reducers
import { Menu } from 'semantic-ui-react';
import { logOut } from '../reducers/userReducer';

// Semantic-UI components

import Message from './Message';

const Navbar = ({ user, logOut }) => (
  <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>

    <Menu pointing secondary stackable style={{ background: 'white' }}>
      <Menu.Item header>Blogs App</Menu.Item>
      <Menu.Item
        name="blogs"
        as={NavLink}
        to="/blogs"
      />
      <Menu.Item
        name="users"
        as={NavLink}
        to="/users"
      />
      <Menu.Menu position="right">
        <Menu.Item header>{`Hi, ${user.name}`}</Menu.Item>
        <Menu.Item
          name="logout"
          onClick={() => logOut()}
          data-cy="logout_button"
        />
      </Menu.Menu>
    </Menu>
    <div>
      <Message />
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  user: state.user,
});


export default connect(mapStateToProps, { logOut })(Navbar);
