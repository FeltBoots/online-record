import React, { Component } from 'react';

import './row.css';

export default class Row extends Component {
  render() {
    const children = this.props.children;
    let key = 0;
    const elements = children.map(e => {
      return (
        <div className="row-item" key={key++}>
          { e }
        </div>
      );
    });

    return (
      <div className="row row-cols">
        { elements }
      </div>
    );
  }
};
