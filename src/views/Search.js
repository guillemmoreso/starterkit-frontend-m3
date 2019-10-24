import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import searchService from '../services/searchService';
import DatePicker from 'react-date-picker';

class Search extends Component {
  state = {
    date: new Date(),
    startingHour: '22:00',
  };

  onDateChange = date => {
    console.log('dateeeee', date);
    this.setState({ date });
  };

  onHourChange = hour => {
    console.log('houuuur', hour.target.value);
    this.setState({ hour });
  };

  handleChange = event => this.setState({ startingHour: event.target.value });

  handleFormSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <h1>Search here your next game:</h1>
        Select date:
        <br />
        <DatePicker onChange={this.onDateChange} value={this.state.date} />
        <br />
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Select starting hour:
            <br />
            <select onChange={this.onHourChange}>
              <option value="20:00">20:00</option>
              <option value="21:00">21:00</option>
              <option selected value="22:00">
                22:00
              </option>
              <option value="23:00">23:00</option>
            </select>
            <input type="submit" value="Submit" />
          </label>
        </form>
      </div>
    );
  }
}

export default withAuth(Search);