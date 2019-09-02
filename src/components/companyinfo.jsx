import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles/companyinfo.css';

function numberToWords(number) {
  if (number / 1000000000000 > 1) {
    let x = number / 1000000000000;
    x = x.toFixed(2);
    return `${x} Trillion`;
  }
  if (number / 1000000000 > 1) {
    let x = number / 1000000000;
    x = x.toFixed(2);
    return `${x} Billion`;
  }
  if (number / 1000000 > 1) {
    let x = number / 1000000;
    x = x.toFixed(2);
    return `${x} Million`;
  }
  if (number / 1000 > 1) {
    let x = number / 1000;
    x = x.toFixed(2);
    return `${x} Thousand`;
  }
  return number;
}

export default class companyinfo extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      data,
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
      <div className="company-info">
        <div className="pair">
          <h4 className="key">Industry</h4>
          <h4 className="value">{data.industry}</h4>
        </div>
        <div className="pair">
          <h4 className="key">CEO</h4>
          <h4 className="value">{data.CEO}</h4>
        </div>
        <div className="pair">
          <h4 className="key">Employees</h4>
          <h4 className="value">
            {`${data.employees} | ${numberToWords(data.employees)}`}
          </h4>
        </div>
        <div className="pair">
          <h4 className="key">Phone</h4>
          <h4 className="value">{data.phone}</h4>
        </div>
        <div className="pair">
          <h4 className="key">Address</h4>
          <h4 className="value">{data.address}</h4>
        </div>
        <div className="pair">
          <h4 className="key">Description</h4>
          <h4 className="value">{data.description}</h4>
        </div>
      </div>
    );
  }
}

companyinfo.propTypes = {
  data: PropTypes.objectOf(Array),
};

companyinfo.defaultProps = {
  data: null,
};
