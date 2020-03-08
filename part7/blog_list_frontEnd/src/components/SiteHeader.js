import React from 'react';
import { Header, Divider } from 'semantic-ui-react';

const SiteHeader = ({ title }) => (
  <div>
    <Header as="h1">{title}</Header>
    <Divider />
  </div>
);

export default SiteHeader;
