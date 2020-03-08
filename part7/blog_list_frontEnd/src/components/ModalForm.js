import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button, Icon, Form, Input,
} from 'semantic-ui-react';
import { useField, useFieldSemanticForm } from '../hooks/hooksindex';

// Reducers
import { newBlog } from '../reducers/blogsReducer';
import { notify } from '../reducers/messageReducer';

// Semantic UI components

const ModalForm = ({ newBlog, notify }) => {
  const [title, alertTitle] = useFieldSemanticForm('text');
  const [url, alertUrl] = useFieldSemanticForm('text');
  const author = useField('text');
  const [open, setOpen] = useState(false);

  const missinInfo = () => {
    if (title.value === '') alertTitle('Missing title field.');
    if (url.value === '') alertUrl('Missing URL field.');
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (title.value === '' || url.value === '') return missinInfo();

    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    newBlog(blog);
    title.onChange();
    url.onChange();
    author.onChange();
    setOpen(false);
    return notify(`Added "${blog.title}" by ${blog.author}`, 'message', 5);
  };

  const handleClose = () => {
    setOpen(false);
    title.onChange();
    url.onChange();
    author.onChange();
  };

  return (
    <div>
      <Button icon labelPosition="left" positive size="tiny" onClick={() => setOpen(true)}
      data-cy="newblog_button">
        <Icon name="add" />
        new blog
      </Button>
      <Modal
        open={open}
        closeOnDimmerClick
        closeOnEscape
        onClose={() => handleClose()}
        size="tiny"
      >
        <Modal.Header>New blog</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field {...title} label="Title" control={Input} required data-cy="title_form"/>
            <Form.Field {...author} label="Author" control={Input} data-cy="author_form"/>
            <Form.Field {...url} label="Url" control={Input} required data-cy="url_form"/>
            <Button positive type="submit" onClick={(e) => handleCreate(e)} data-cy="create_button">Create</Button>
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default connect(null, { newBlog, notify })(ModalForm);
