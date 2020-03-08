import React, { useState } from 'react';
import { connect } from 'react-redux';

// Semantic UI components
import { Button, Confirm, Icon } from 'semantic-ui-react';

// Reducers
import { delBlog } from '../reducers/blogsReducer';
import { notify } from '../reducers/messageReducer';


const DeleteButton = ({ blog, delBlog, notify }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = (blog) => {
    delBlog(blog);
    notify(`You deleted "${blog.title}" by ${blog.author}`, 'message', 5);
    setOpen(false);
  };

  return (
    <div className="ui tiny left labeled button">
      <Button as="div" labelPosition="left" size="tiny" onClick={() => setOpen(true)}>
        <Button icon size="tiny">
          <Icon name="trash" />
          Delete
        </Button>
      </Button>
      <Confirm
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={() => handleDelete(blog)}
      />
    </div>
  );
};

export default connect(null, { delBlog, notify })(DeleteButton);
