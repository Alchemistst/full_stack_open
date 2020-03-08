import React from 'react';
import { connect } from 'react-redux';

// Semantic UI components
import { Message } from 'semantic-ui-react';


// Message component render both notification
// (if called with err = "message") and error messages
// (if called with err = "error")
const MessageComponent = ({ message }) => {
  if (!message) {
    return null;
  }

  const positive = message.type === 'message';
  const negative = message.type === 'error';


  return (
    <Message as="div" positive={positive} negative={negative} style={{ position: 'absolute', width: '100%' }}>
      <Message.Header>{message.text}</Message.Header>
    </Message>
  );
};
const mapStateToProps = (state) => ({
  message: state.message,
});

export default connect(mapStateToProps)(MessageComponent);
