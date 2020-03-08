import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import { Container, Image, Table } from 'semantic-ui-react';
import SiteHeader from './SiteHeader';
import userAvatar from '../assets/user.png';

// Semantic UI components

// Reducers
import { initStats } from '../reducers/userStatsReducer';

const Users = ({ stats, initStats }) => {
  useEffect(() => {
    initStats();
  }, [initStats]);

  return (
    <div>
      <Container text>
        <SiteHeader title="Users" />
        <div sytle={{ padding: '0 1em 0 1em' }}>
          <Table basic="very" selectable stackable={false}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>blogs created</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {stats.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell>
                    <Image src={userAvatar} avatar />
                    <span><Link to={`/users/${user.id}`}>{user.name}</Link></span>
                  </Table.Cell>
                  <Table.Cell>
                    {user.blogs.length}
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

const mapStateToProps = (state) => ({
  stats: state.stats,
});

export default connect(mapStateToProps, { initStats })(Users);
