import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NewsItem from './newsitem';

import './styles/news.css';

export default class news extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  static getDerivedStateFromProps(newProps, oldProps) {
    if (newProps !== oldProps) {
      return {
        data: newProps.data,
      };
    }
    return null;
  }

  render() {
    const { data } = this.state;
    if (!data) return null;
    return (
      <div className="news">
        {data.map((item) => (
          <NewsItem data={item} />
        ))}
      </div>
    );
  }
}

news.propTypes = {
  data: PropTypes.shape({
    companyName: PropTypes.string.isRequired,
  }),
};

news.defaultProps = {
  data: 0,
};
