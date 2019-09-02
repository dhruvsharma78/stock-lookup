import React, { Component } from 'react';

import Header from './components/header';
import SearchBar from './components/searchbar';
import StockInfo from './components/stockinfo';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
  }

  getSearchData = (val) => {
    this.setState({
      selected: val,
    });
  };

  render() {
    const { selected } = this.state;
    return (
      <div className="container">
        <Header title="Stock Lookup" />
        <SearchBar onChange={this.getSearchData} />
        {selected && <StockInfo ticker={selected} />}
      </div>
    );
  }
}
