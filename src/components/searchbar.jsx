import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Async from 'react-select/async';
import Axios from 'axios';

import './styles/searchbar.css';

export default class searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: {
        value: '',
        label: '',
      },
    };
  }

  getTickerOptions = (value) =>
    Axios.get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=SSTSI32JZX6KIXV3`,
    ).then((res) => {
      const data = res.data.bestMatches;
      if (res !== undefined) {
        const options = [];
        for (let i = 0; i < res.length; i += 1) {
          options.push({
            value: data[i]['1. symbol'],
            label: `${data[i]['1. symbol']} | ${data[i]['2. name']}`,
          });
        }
        return options;
      }
      return [];
    });

  updateTicker = (newval) => {
    const { onChange } = this.props;
    this.setState({ ticker: newval });
    onChange(newval.value);
  };

  render() {
    const { ticker } = this.state;
    return (
      <div className="search-bar">
        <Async
          classNamePrefix="react-select"
          label="Select Stock"
          value={ticker}
          loadOptions={this.getTickerOptions}
          onChange={this.updateTicker}
        />
      </div>
    );
  }
}

searchbar.propTypes = {
  onChange: PropTypes.func.isRequired,
};
