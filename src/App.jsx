import React, { Component } from 'react';
import ReactGA from 'react-ga';

import Header from './components/header';
import SearchBar from './components/searchbar';
import StockInfo from './components/stockinfo';

import './app.css';

const APP_TITLE = 'Stock Lookup';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockList: null,
      optionsList: null,
      selected: 'AAPL',
    };
  }

  componentDidMount() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          const data = JSON.parse(httpRequest.responseText);
          this.setState({
            stockList: data,
          });
        }
      }
    };
    httpRequest.open(
      'GET',
      `https://cloud.iexapis.com/stable/ref-data/symbols?token=${process.env.REACT_APP_IEX_API_KEY}`,
    );
    httpRequest.send();
  }

  componentDidUpdate() {
    const { stockList, optionsList } = this.state;
    if (stockList && !optionsList) this.formatStockList();
  }

  getSearchData = (val) => {
    this.setState({
      selected: val,
    });
    ReactGA.event({
      category: 'Actions',
      action: 'Lookup Stock'
    });
  };

  formatStockList = () => {
    const { stockList } = this.state;
    const options = [];
    stockList.forEach((item) => {
      if (item.isEnabled === true) {
        options.push({
          value: item.symbol,
          label: `${item.symbol} | ${item.name}`,
        });
      }
    });
    this.setState({
      optionsList: options,
    });
  };

  render() {
    const { selected, optionsList, stockList } = this.state;
    if (!stockList || !optionsList) {
      return (
        <div className="container">
          <Header title={APP_TITLE} />
          <div className="app-loading">
            <h1 className="loading">{`${APP_TITLE} is loading...`}</h1>
            <h2 className="wait">Please Wait</h2>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <Header title={APP_TITLE} />
        <SearchBar onChange={this.getSearchData} options={optionsList} />
        {selected && <StockInfo ticker={selected} />}
      </div>
    );
  }
}
