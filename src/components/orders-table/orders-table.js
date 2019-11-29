import React, { Component } from 'react';

import './orders-table.css';

export default class OrdersTable extends Component {

  state = {
    storage: {}
  };

  getAllLocalStorage() {
    return Object.keys(localStorage)
      .reduce((obj, k) => {
        return { ...obj, [k]: JSON.parse(localStorage.getItem(k))}}, {});
  }

  componentDidMount() {
    this.setState({
      storage : this.getAllLocalStorage()
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const oldStorage = prevState.storage;
    const newStorage = this.props.storage;
    const oldLength =  oldStorage ? Object.keys(oldStorage).length : null;
    const newLength =  newStorage ? Object.keys(newStorage).length : null;
    if (oldLength && newLength && oldLength !== newLength) {
      this.setState({
        storage : this.getAllLocalStorage()
      });
    }
  }

  onDelete = (key) => {
    this.setState(({ storage }) => {
      const clonedStorage = JSON.parse(JSON.stringify(storage));
      delete clonedStorage[key];
      localStorage.removeItem(key);
      return {
        storage: clonedStorage
      }
    });
  };

  renderRows = (storage) => {
    let rows = [];
    for (const key in storage) {
      const record = storage[key];
      rows.push((
        <tr key={key}>
          <td className="text-center">{record.name}</td>
          <td>{record.city}</td>
          <td>{record.day}</td>
          <td className="text-center">{record.time}</td>
          <td className="text-center">
            <i className="far fa-trash-alt"
               onClick={() => { this.onDelete(key) }}>
            </i>
          </td>
        </tr>
      ));
    }
    return rows;
  };

  render() {

    const { storage } = this.state;
    const rows = this.renderRows(storage);

    return (
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Город</th>
            <th>День</th>
            <th>Время</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </table>
    )
  }
}
