import React, { Component } from 'react';

import './select-item.css';

export default class SelectItem extends Component {

  state = {
    itemList: null,
    selected: null,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.itemList !== prevProps.itemList) {
      const { itemList, defaultValue } = this.props;
      this.setState({
        itemList: itemList,
        selected: defaultValue
      });
    }
  }

  renderItems(items, propNameKey, propNameValue) {
    return items.map((item, idx) => {
      const key = propNameKey ? item[propNameKey] : idx;
      const value = item[propNameValue];
      return (
        <option key={key} value={key}>{value}</option>
      );
    });
  };

  onSelect = (e) => {
    this.props.onUpdate(e);
    this.setState({
      selected: e.target.value
    });
  };

  render() {

    const { itemList, selected } = this.state;

    const { onRender: { value, name}, defaultValue, disabled, error, onBlur } = this.props;

    const items = itemList ? this.renderItems(itemList, value, name) : null;

    const clazz = error ? 'error' : null;

    return (
      <select
        className={`da-input da-select da-select-new da-input_new ${clazz}`}
        // defaultValue={defaultValue}
        value={selected ? selected : defaultValue}
        onChange={this.onSelect}
        disabled={disabled}
        onBlur={onBlur}>
        { items }
        <option key={defaultValue} disabled hidden value={defaultValue}>{ defaultValue }</option>
      </select>
    );
  }
};
