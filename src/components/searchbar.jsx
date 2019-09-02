import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import createFilterOptions from 'react-select-fast-filter-options';

import './styles/searchbar.css';

export default class searchbar extends Component {
  constructor(props) {
    super(props);
    const { options } = props;
    this.state = {
      ticker: {
        value: '',
        label: '',
      },
      options,
    };
  }

  getTickerOptions = (query) => {
    const { options } = this.state;
    const possibleChoices = options.filter((option) =>
      option.label.match(`/${query}/gi`),
    );
    return possibleChoices;
  };

  updateTicker = (newval) => {
    const { onChange } = this.props;
    this.setState({ ticker: newval });
    onChange(newval.value);
  };

  render() {
    const { ticker, options } = this.state;
    return (
      <div className="search-bar">
        {/* <Async
          classNamePrefix="react-select"
          label="Select Stock"
          value={ticker}
          loadOptions={this.getTickerOptions}
          onChange={this.updateTicker}
        /> */}
        <Select
          classNamePrefix="react-select"
          label="Select Stock"
          value={ticker}
          filterOptions={createFilterOptions}
          options={options}
          onChange={this.updateTicker}
        />
      </div>
    );
  }
}

searchbar.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
