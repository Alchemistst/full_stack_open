import React from 'react';
import { connect } from 'react-redux';

// Components
import {
  Container, Button, Label, Icon, Image, Segment,
} from 'semantic-ui-react';
import CommentDisplay from './CommentDisplay';
import SiteHeader from './SiteHeader';
import userAvatar from '../assets/user.png';
import DeleteButton from './DeleteButton';

// Semantic UI components

// Reducers
import { likeBlog, delBlog } from '../reducers/blogsReducer';
import { notify } from '../reducers/messageReducer';

const Blog = ({
  blog, permission, likeBlog, notify,
}) => {
  const handleLike = (blog) => {
    likeBlog(blog);
    notify(`You liked "${blog.title}" by ${blog.author}`, 'message', 5);
  };

  if (blog) {
    return (
      <div>
        <Container text>
          <SiteHeader title={blog.title} />
          <Container>
            <Segment.Group>
              <Segment textAlign="right">
                added by
                {' '}
                <span>
                  <Image src={userAvatar} avatar />
                  <Label color="black" pointing="left">{blog.user.name}</Label>
                </span>
              </Segment>
              <Segment>
                <div>
                  <b>Author: </b>
                  {blog.author}
                </div>
                <div>
                  <b>Website: </b>
                  {blog.url}
                </div>
              </Segment>
              <Segment>
                <div>
                  {permission
          && <DeleteButton blog={blog} />}

                  <Button as="div" labelPosition="left" size="tiny">
                    <Label as="a" basic pointing="right">
                      {blog.likes}
                    </Label>
                    <Button icon size="tiny" onClick={() => handleLike(blog)}>
                      <Icon name="heart" />
                      Like
                    </Button>
                  </Button>
                </div>
              </Segment>
            </Segment.Group>

            <CommentDisplay blog={blog} />
          </Container>

        </Container>
      </div>
    );
  }
  return null;
};


const mapStateToProps = ({ blogs, user }, { id }) => {
  const blog = blogs.find((blog) => blog.id === id);
  const permission = blog && user ? blog.user.username === user.username : false;
  return ({
    blog,
    permission,
  });
};

export default connect(mapStateToProps, { likeBlog, delBlog, notify })(Blog);
