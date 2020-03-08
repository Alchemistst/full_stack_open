import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Segment, Header, Form, Button, Input, Label, Transition,
} from 'semantic-ui-react';
import { useFieldSemanticForm } from '../hooks/hooksindex';

// Semantic UI components

// Reducers
import { logIn } from '../reducers/userReducer';


const LogInForm = ({ logIn }) => {
  const [username, alertUsername] = useFieldSemanticForm('text');
  const [password, alertPassword] = useFieldSemanticForm('password');
  const [visible, setVisible] = useState(false);

  const handleLogIn = async (e, username, password, logIn) => {
    e.preventDefault();

    if (username.value === '' || password.value === '') {
      if (username.value === '') alertUsername('Missing Username.');
      if (password.value === '') alertPassword('Missing Password.');
      return;
    }

    username.onChange();
    password.onChange();

    const r = await logIn({ username: username.value, pass: password.value });
    if (r === false) setVisible(true);
  };

  return (
    <div className="LogInForm">
      <Segment.Group style={{ width: '20em', margin: 'auto', marginTop: '5em' }} raised>
        <Transition visible={visible} animation="fade" duration={500}>
          <Label attached="top" color="red">Wrong username or password</Label>
        </Transition>
        <Segment textAlign="center">
          <Header as="h1">Blog app</Header>
        </Segment>
        <Segment>
          <Form>
            <Form.Field label="Username" {...username} control={Input} data-cy="username_input" />
            <Form.Field label="Password" {...password} control={Input} data-cy="password_input" />
            <Button type="submit" onClick={(e) => handleLogIn(e, username, password, logIn)} data-cy="submit_button" >Log in</Button>
          </Form>
        </Segment>
      </Segment.Group>
    </div>
  );
};

export default connect(null, { logIn })(LogInForm);
