import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Hero from './hero';
import CompanyInfo from './companyinfo';
import FundamentalData from './fundamentaldata';
import News from './news';

import './styles/stockinfo.css';

export default class stockinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: props.ticker,
      quoteData: {
        data: null,
        valid: false,
      },
      companyData: {
        data: null,
        valid: false,
      },
      newsData: {
        data: null,
        valid: false,
      },
    };
  }

  static getDerivedStateFromProps(newProps, oldProps) {
    if (newProps !== oldProps) {
      return {
        ticker: newProps.ticker,
      };
    }
    return null;
  }

  componentDidMount() {
    this.updateData();
  }

  componentDidUpdate(prevProps) {
    const { ticker } = this.state;
    if (prevProps.ticker !== ticker) {
      this.updateData();
    }
  }

  getData = (path, toSet) => {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          const data = JSON.parse(httpRequest.responseText);
          this.setState({
            [toSet]: {
              data,
              valid: true,
            },
          });
        }
      }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
  };

  updateData = () => {
    const { ticker } = this.state;
    this.getData(
      `https://cloud.iexapis.com/stable/stock/${ticker}/news/last/10?token=${process.env.REACT_APP_IEX_API_KEY}`,
      'newsData',
    );

    this.getData(
      `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${process.env.REACT_APP_IEX_API_KEY}`,
      'quoteData',
    );

    this.getData(
      `https://cloud.iexapis.com/stable/stock/${ticker}/company?token=${process.env.REACT_APP_IEX_API_KEY}`,
      'companyData',
    );
  };

  render() {
    const { companyData, quoteData, newsData } = this.state;
    if (!companyData.valid || !quoteData.valid || !newsData.valid) return null;
    return (
      <div>
        <Hero data={quoteData.data} />
        <div className="bottom">
          <CompanyInfo data={companyData.data} />
          <FundamentalData data={quoteData.data} />
          <News data={newsData.data} />
        </div>
      </div>
    );
  }
}

stockinfo.propTypes = {
  ticker: PropTypes.string,
};

stockinfo.defaultProps = {
  ticker: '',
};
