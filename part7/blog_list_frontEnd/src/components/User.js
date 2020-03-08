import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Semantic UI components
import { Container, Segment, Header } from 'semantic-ui-react';

// Components
import SiteHeader from './SiteHeader';

// Reducers
import { initStats } from '../reducers/userStatsReducer';

const User = ({ user, initStats }) => {
  useEffect(() => {
    initStats();
  }, [initStats]);

  if (user) {
    return (
      <div>
        <div>
          <Container text>
            <SiteHeader title={user.name} />
            <Container>
              <Segment.Group>
                <Segment>
                  <Header>Added blogs</Header>
                </Segment>
                <Segment>
                  {user.blogs.map((blog) => <Segment key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></Segment>)}
                </Segment>
              </Segment.Group>
            </Container>
          </Container>
        </div>
      </div>
    );
  }

  return null;
};

const mapStateToProps = ({ stats }, { id }) => ({
  user: stats.find((user) => user.id === id),
});

export default connect(mapStateToProps, { initStats })(User);
