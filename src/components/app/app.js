import React, { Component } from 'react';

import './app.css';

import Header from "../header/header";
import RecordForm from "../record-form";
import FormItem from "../form-item";
import SelectItem from "../select-item/select-item";
import CityInfo from "../city-info";
import FormButton from "../form-button";
import FormRules from "../form-rules";
import FormName from "../form-name";
import DatePicker from "../date-picker";
import PhoneItem from "../phone-item";
import MessageIndicator from "../error-indicator";
import OrdersTable from "../orders-table";

import ApiService from "../../services/api-service";
import DateFormatter from "../../helpers";

import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {

  apiService = new ApiService();
  dateFormatter = new DateFormatter();

  /* TODO: refactor with Redux:) */
  state = {
    citiesList: null,
    cityId: null,
    timeTable: null,
    dataPickerError: {
      day: false,
      time: false,
    },
    phoneError: false,
    nameError: false,
    record: {
      city: null,
      day: null,
      time: null,
      phone: null,
      name: null,
    },
    submitAvailable: false,
    loading: true,
    saved: false,
    apiError: false,
    internalError: false,
  };

  updateCityId = (e) => {
    const cityId = e.target.value;
    const city = this.state.citiesList.find(el => el.id === cityId).name;
    const { phone, name } = this.state.record;
    this.setState({
      cityId: cityId,
      record: {
        city,
        day: null,
        time: null,
        phone,
        name,
      }
    });
    this.updateFreeTime(cityId);
  };

  updateFreeTime = (cityId) => {
    this.setState({
      loading: true,
    });
    this.apiService.getTimesAndDays(cityId).then(res => {
      this.setState(({ citiesList }) => {
        return {
          citiesList: citiesList,
          timeTable: this.dateFormatter.formatData(res),
          cityId: cityId,
          loading: false,
        }
      });
    }).catch(msg => {
      this.setState({
        loading: false,
        apiError: true,
      });
    })
  };

  componentDidMount() {
    this.apiService.getAllCities().then((citiesList) => {
      const cityId = citiesList.cities[0].id;
      const newRecord = { ...this.state.record };
      this.setState({
        citiesList: citiesList.cities,
        cityId: cityId,
        record: {
          ...newRecord,
          city: citiesList.cities[0].name,
        },
        loading: false,
      });
      this.updateFreeTime(cityId);
    }).catch(msg => {
      this.setState({
        loading: false,
        apiError: true,
      });
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { record } = this.state;
    if (Object.values(record).filter(e => e === null).length > 0) {
      this.setState(({ record }) => {
        /* Convert to false if it does not exists with !!! syntax */
        return {
          phoneError: !!!record.phone,
          nameError: !!!record.name,
          dataPickerError: {
            day: !!!record.day,
            time: !!!record.time
          }
        }
      });
    } else {
      console.log('**** SAVING DATA ****');
      this.setState({
        loading: true
      });
      setTimeout(() => {
        this.setState({
          loading: false,
          saved: true,
        });
        const { name } = this.state.record;
        const key  = `${this.state.cityId}+${name}+${Math.random() * 50}`;
        localStorage.setItem(key, JSON.stringify(this.state.record));
        console.log('saved');
      }, 1000);
    }
  };

  onUpdateRecord = (val) => {
    this.setState(({ record }) => {
      const newRecord = {...record};
      return {
        record: {
          ...newRecord,
          ...val,
        }
      }
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.record !== this.state.record) {
      const { record } = this.state;
      this.setState({
        submitAvailable: Object.values(record).filter(e => e === null).length === 0
      });
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      internalError: true,
    })
  }

  render() {

    const { citiesList, cityId, timeTable,
      dataPickerError, phoneError,
      nameError, submitAvailable, loading,
      saved, apiError, internalError } = this.state;

    const cityInfo = cityId && citiesList ? citiesList.find(e => e.id === cityId) : null;

    // TODO: move to error-indicator module
    if (apiError) {
      return (
        <MessageIndicator>
          <div className="message-error">Could not fetch API, please contact system administrator or try later</div>
        </MessageIndicator>
      );
    }

    if (saved) {
      return (
        <MessageIndicator>
          <div className="message-success">Вы успешно записались на стирку, записи можно смотреть в <i>/orders</i></div>
        </MessageIndicator>
      );
    }

    if (internalError) {
      return (
        <MessageIndicator>
          <div className="message-error">Internal error has just happened, please contact system administrator</div>
        </MessageIndicator>
      );
    }

    return (
      <div className="app">
        <Router>
          <Route exact path="/">
          <Header loading={loading}/>
          <RecordForm
            onSubmit={this.onSubmit}
            loading={loading}>

            <FormItem>
              <SelectItem
                itemList={citiesList}
                onUpdate={this.updateCityId}
                onRender={{ value: 'id', name: 'name' }}/>
            </FormItem>

            <FormItem>
              <DatePicker
                timeTable={timeTable}
                error={dataPickerError}
                onUpdateRecord={this.onUpdateRecord}/>
            </FormItem>

            <FormItem>
              <CityInfo cityInfo={cityInfo} />
            </FormItem>

            <FormItem>
              <PhoneItem
                error={phoneError}
                onUpdateRecord={this.onUpdateRecord}/>
            </FormItem>

            <FormItem>
             <FormName
               error={nameError}
               onUpdateRecord={this.onUpdateRecord}/>
            </FormItem>

            <FormItem>
              <FormButton available={submitAvailable}/>
            </FormItem>

            <FormItem>
              <FormRules />
            </FormItem>
          </RecordForm>
          </Route>
          <Route path="/orders" component={OrdersTable}/>
        </Router>
      </div>
    );
  }
}
