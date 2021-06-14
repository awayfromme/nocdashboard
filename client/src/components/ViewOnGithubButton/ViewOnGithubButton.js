import React from 'react';

import Button from './Button';
import Icon from './Icon';

const ViewOnGithubButton = () => (
  <a
    style={{ textDecoration: 'none' }}
    href="https://github.com/awayfromme/nocdashboard"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
      inverted
    >
      <Icon style={{ marginRight: '1rem' }} icon="logo-github" />
      View on GitHub
    </Button>
  </a>
);

export default ViewOnGithubButton;