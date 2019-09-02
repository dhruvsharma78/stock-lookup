import React, { Component } from 'react';
import PropTypes from 'prop-types';

import stockup from '../icons/stock-up.svg';
import stockdown from '../icons/stock-down.svg';

import './styles/hero.css';

export default class hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 0,
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
    let triangle = stockup;
    let triangleAlt = 'stock up';
    if (data.change <= 0) {
      triangle = stockdown;
      triangleAlt = 'stock down';
    }
    return (
      <div className="hero">
        <h1>{data.companyName}</h1>
        <p className="exchange">{data.primaryExchange}</p>
        <div className="pricedata">
          <p className="latest-price">{data.latestPrice}</p>
          <div className="movement">
            <img src={triangle} alt={triangleAlt} />
            <p className="abs-movement">{data.change}</p>
          </div>
        </div>
      </div>
    );
  }
}

hero.propTypes = {
  data: PropTypes.shape({
    companyName: PropTypes.string.isRequired,
  }),
};

hero.defaultProps = {
  data: 0,
};
