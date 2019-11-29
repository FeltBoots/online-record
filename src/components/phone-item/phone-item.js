import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import ValidationError from "../validation-error";

export default class PhoneItem extends Component {

  _mask = '+7 \(999\) 999\-99\-99';
  _maskRegexp = /\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}/;

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.error !== this.props.error && !this.state.error) {
      this.setState({
        notValid: true,
        error: this.props.error,
      })
    }
  }

  _isEqual = (value) => {
    return value.match(this._maskRegexp);
  };

  state = {
    value: '',
    notValid: null,
    error: false,
  };

  onChange = (e) => {
    const value = e.target.value;
    const equal = this._isEqual(value);
    this.props.onUpdateRecord({ phone: equal ? value : null });
    this.setState({
      value
    });
    if (equal) {
      this.setState({
        notValid: false,
      })
    }
  };

  onFocusOut = (e) => {
    const { value } = this.state;
    const equal = this._isEqual(value);
    this.setState({
      notValid: !equal
    });
  };

  render() {

    const { notValid } = this.state;

    const clazz = notValid ? "error" : "";

    return (
      <React.Fragment>
        <InputMask
          className={ `da-input da-input_new ${clazz}` }
          alwaysShowMask={true}
          mask={this._mask}
          maskChar={'_'}
          value={this.state.value}
          onChange={this.onChange}
          onBlur={this.onFocusOut}
        />
        <ValidationError
          message={'Пожалуйста, введите корректный телефон, иначе наши специалисты не смогут связаться с вами'}
          show={notValid}/>
      </React.Fragment>
    );
  }
}
