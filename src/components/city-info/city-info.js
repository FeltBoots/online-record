import React, { Component } from 'react';

import './city-info.css';

export default class CityInfo extends Component {

  state = {
    cityInfo: null
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.cityInfo !== prevProps.cityInfo) {
      this.setState({ cityInfo: this.props.cityInfo } );
    }
  }

  formatPhones(phones) {
    const toFormat = (p) => `+${p[0]} (${p.slice(1, 4)}) ${p.slice(4, 7)}-${p.slice(7, 9)}-${p.slice(9)}`;
    return phones.map((phone, i) => {
      return (
        <React.Fragment key={phone}>
          <a href="#" className="form-link">{ toFormat(phone) }</a>
          {i < phones.length - 1 ? ', ' : ''}
        </React.Fragment>
      );
    });
  };

  renderInfo(cityInfo) {
    const { address, phones, price } = cityInfo;

    const formattedPrice = price ? `Стоимость услуги ${price}` : null;
    const formattedPhones = phones.length > 0 ? this.formatPhones(phones) : null;

    return (
      <React.Fragment>
        <div>{address}</div>
        <div>{formattedPhones}</div>
        <div>{formattedPrice}</div>
      </React.Fragment>
    );
  };

  render() {
    const { cityInfo } = this.state;
    const elements = cityInfo ? this.renderInfo(cityInfo) : null;
    return (
      <div className="city-info">
        { elements }
      </div>
    );
  };
};
