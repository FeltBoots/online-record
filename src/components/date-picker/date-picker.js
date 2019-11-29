import React, { Component } from 'react';

import SelectItem from "../select-item/select-item";
import Row from "../row";
import ValidationError from "../validation-error";

export default class DatePicker extends Component {

  state = {
    error: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.timeTable !== prevProps.timeTable) {
      this.setState({
        timeTable: this.props.timeTable,
        availableTime: null,
        selectedDay: null,
        selectedTime: null,
        notValidDay: null,
        notValidTime: null,
      })
    }
    if (prevState.error !== this.props.error) {
      const { day, time } = this.props.error;
      this.setState({
        error: this.props.error,
        notValidTime: time,
        notValidDay: day,
      })
    }
  }

  onDaySelect = (e) => {
    const selectedDay = e.target.value;
    const day = this.state.timeTable[selectedDay].day;
    this.props.onUpdateRecord({ day, time: null });
    this.setState({
      availableTime: [...this.state.timeTable[selectedDay].freeTime],
      selectedDay,
      notValidDay: null,
      selectedTime: null,
    });
  };

  onTimeSelect = (e) => {
    const timeIndex = e.target.value;
    const { selectedDay, timeTable } = this.state;
    const time = timeTable[selectedDay].freeTime[timeIndex].time;
    this.props.onUpdateRecord({ time });
    this.setState({
      selectedTime: time,
      notValidTime: false,
    });
  };

  onSelectDayFocusOut = () => {
    this.setState({
      notValidDay: !this.state.selectedDay
    });
  };

  onSelectTimeFocusOut = (e) => {
    this.setState({
      notValidTime: !this.state.selectedTime
    });
  };

  render() {

    const { timeTable, availableTime, notValidDay, notValidTime } = this.state;

    const disabled = availableTime ? 0 : 1;

    const dayError = notValidDay;
    const timeError = notValidTime;

    return (
      <React.Fragment>
        <Row>
          <SelectItem
            error={dayError}
            itemList={timeTable}
            onUpdate={this.onDaySelect}
            defaultValue={'День'}
            onRender={{ name: 'day' }}
            onBlur={this.onSelectDayFocusOut}>
          </SelectItem>
          <SelectItem
            error={timeError}
            itemList={availableTime}
            onUpdate={this.onTimeSelect}
            defaultValue={'Время'}
            onRender={{ value: 'id', name: 'time' }}
            disabled={disabled}
            onBlur={this.onSelectTimeFocusOut}>
          </SelectItem>
        </Row>
        <ValidationError message={'Пожалуйста, выберите дату'} show={dayError}/>
        <ValidationError message={'Пожалуйста, выберите время'} show={timeError}/>
      </React.Fragment>
    )
  }

};
