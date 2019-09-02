import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles/fundamentaldata.css';

function numberToWords(number) {
  if (!number) return '';
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

export default class fundamentaldata extends Component {
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
      <div className="fundamental-data">
        <div className="pair">
          <h4 className="key">Volume</h4>
          <h4 className="value">
            {`${data.latestVolume ? data.latestVolume : 'Markets Closed'} 
          | 
          ${numberToWords(data.latestVolume)}`}
          </h4>
        </div>
        <div className="pair">
          <h4 className="key">P/E Ratio</h4>
          <h4 className="value">{data.peRatio}</h4>
        </div>
        <div className="pair">
          <h4 className="key">Open</h4>
          <h4 className="value">
            {data.open ? `$ ${data.open}` : 'Markets Closed'}
          </h4>
        </div>
        <div className="pair">
          <h4 className="key">Close</h4>
          <h4 className="value">
            {data.close ? `$ ${data.close}` : 'Markets Closed'}
          </h4>
        </div>
        <div className="pair">
          <h4 className="key">Low</h4>
          <h4 className="value">
            {data.low ? `$ ${data.low}` : 'Markets Closed'}
          </h4>
        </div>
        <div className="pair">
          <h4 className="key">High</h4>
          <h4 className="value">
            {data.high ? `$ ${data.high}` : 'Markets Closed'}
          </h4>
        </div>
        <div className="pair">
          <h4 className="key">52 Wk High</h4>
          <h4 className="value">{`$ ${data.week52High}`}</h4>
        </div>
        <div className="pair">
          <h4 className="key">52 Wk Low</h4>
          <h4 className="value">{`$ ${data.week52Low}`}</h4>
        </div>
        <div className="pair">
          <h4 className="key">YTD Change</h4>
          <h4 className="value">{`$ ${data.ytdChange.toFixed(4)}`}</h4>
        </div>
        <div className="pair">
          <h4 className="key">Market Cap</h4>
          <h4 className="value">
            {`$ ${data.marketCap} 
          | ${numberToWords(data.marketCap)}`}
          </h4>
        </div>
        <div className="pair">
          <h4 className="key">Exchange</h4>
          <h4 className="value">{data.primaryExchange}</h4>
        </div>
      </div>
    );
  }
}

fundamentaldata.propTypes = {
  data: PropTypes.shape({
    Volume: PropTypes.number.isRequired,
  }),
};

fundamentaldata.defaultProps = {
  data: null,
};
