import React from 'react';
import PropTypes from 'prop-types';

import './styles/header.css';

export default function header(props) {
  const { title } = props;
  return (
    <header className="header-container">
      <h1>{title}</h1>
    </header>
  );
}

header.propTypes = {
  title: PropTypes.string.isRequired,
};
