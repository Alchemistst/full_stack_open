import React from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';
import {
  Header, Comment, Form, Button,
} from 'semantic-ui-react';
import { useField } from '../hooks/hooksindex';

// Semantic UI components

// Reducers
import { addComment } from '../reducers/blogsReducer';

const CommentDisplay = ({ blog, addComment }) => {
  const commentField = useField('text');
  const { comments } = blog;

  const handleComment = (e) => {
    e.preventDefault();
    addComment(blog, commentField.value);
    commentField.onChange();
  };

  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>
      {comments.length !== 0
        && comments.map((c) => (
          <Comment key={uniqid()}>
            <Comment.Content>
              <Comment.Text>{c}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}
      {comments.length === 0
            && 'No comments to show yet'}
      <Form reply>
        <Form.TextArea {...commentField} />
        <Button content="Send" labelPosition="left" icon="edit" primary onClick={(e) => handleComment(e)} />
      </Form>
    </Comment.Group>
  );
};

export default connect(null, { addComment })(CommentDisplay);
