import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import {
  Container, Table, Button, Icon, Label,
} from 'semantic-ui-react';
import ModalForm from './ModalForm';
import SiteHeader from './SiteHeader';

// Semantic-UI components

// Reducers
import { likeBlog } from '../reducers/blogsReducer';
import { notify } from '../reducers/messageReducer';

const BlogsDisplay = ({ blogs, likeBlog, notify }) => {
  const handleLike = (blog) => {
    likeBlog(blog);
    notify(`You liked "${blog.title}" by ${blog.author}`, 'message', 5);
  };

  return (
    <div className="BlogDisplay">
      <Container text>
        <SiteHeader title="Blogs" />
        <ModalForm />
        <div style={{ padding: '0 1em 0 1em' }}>
          <Table basic="very">
            <Table.Body data-cy="blogs_table">
              {blogs.map((b) => (
                <Table.Row key={b.id}>
                  <Table.Cell>
                    <Link to={`/blogs/${b.id}`}>{b.title}</Link>
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <Button as="div" labelPosition="left" size="tiny">
                      <Label as="a" basic pointing="right">
                        {b.likes}
                      </Label>
                      <Button icon size="tiny" onClick={() => handleLike(b)}>
                        <Icon name="heart" />
                        Like
                      </Button>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  state.blogs.sort((a, b) => {
    if (a.likes > b.likes) return -1;

    if (a.likes < b.likes) return 1;

    return 0;
  });

  return {
    blogs: state.blogs,
  };
};

export default connect(mapStateToProps, { likeBlog, notify })(BlogsDisplay);
