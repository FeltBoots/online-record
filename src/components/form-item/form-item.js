import React, { Component } from 'react';

import './form-item.css';

export default class FormItem extends Component {
  render() {
    return (
      <div className="form-item">
        { this.props.children }
      </div>
    );
  }
};
