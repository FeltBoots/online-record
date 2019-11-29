import React, { Component } from 'react';

import './form-name.css';
import '../app/app.css';
import ValidationError from "../validation-error";

export default class FormName extends Component {

  state = {
    notValid: false,
    value: '',
    error: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.error !== this.props.error && this.state.value === '') {
      this.setState({
        notValid: true,
        error: this.props.error,
      })
    }
  }

  onFocusOut = (e) => {
    const value = e.target.value;
    if (value === '') {
      this.setState({
        notValid: true
      });
    }
  };

  onChange = (e) => {
    const value = e.target.value;
    if (value !== '') {
      this.props.onUpdateRecord({ name: value });
      this.setState({
        notValid: false,
        value
        // error: false,
      });
    } else {
      this.props.onUpdateRecord({ name: null });
    }
  };

  render () {

    const { notValid } = this.state;

    const clazz = notValid ? "error" : "";

    return (
      <React.Fragment>
        <input
          className={ `da-input da-input_new ${clazz}` }
          type="text"
          placeholder="Ваше имя"
          onBlur={this.onFocusOut}
          onFocus={this.onFocusIn}
          onChange={this.onChange}/>
        <ValidationError message={'Пожалуйста, укажите имя'} show={notValid}/>
      </React.Fragment>
    );
  }
}
