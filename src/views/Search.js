import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import searchService from '../services/searchService';
import DatePicker from 'react-date-picker';
// import HourSelector from '../components/HourSelector';

// import Loading from '../components/Loading/Loading';

class Search extends Component {
  state = {
    date: new Date(),
    searchStartingHour: 9,
    clubs: [],
    isLoading: true,
  };

  async componentDidMount() {
    try {
      const clubs = await searchService.getClubsByHour();
      this.setState({
        clubs,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  onDateChange = date => {
    this.setState({ date });
  };

  onHourChange = searchStartingHour => {
    this.setState({ searchStartingHour: searchStartingHour.target.value });
  };

  handleFormSubmit = async () => {
    console.log('state', this.state);

    try {
      const { searchStartingHour, date } = this.state;
      const userSearchResult = await searchService.dataPicker({ searchStartingHour, date });
      console.log('result: ', userSearchResult);
      this.setState({ clubs: userSearchResult });
    } catch (error) {
      console.error('Error buscando pistas disponibles');
    }
  };

  render() {
    const { clubs, isLoading } = this.state;
    return (
      <div>
        <div id="page-name">
          <span>Search</span>
        </div>
        <br />
        <div id="datePicker">
          <span id="select-date">Select date:</span>
          <DatePicker onChange={this.onDateChange} value={this.state.date} />
        </div>
        <br />
        {/* <HourSelector /> */}
        <div id="display-block">
          <div id="hour-select-div">
            <form>
              <label>
                {/* Select starting hour: */}
                <br />
                <select id="hour-select" onChange={this.onHourChange}>
                  <option defaultValue value="9">
                    09:00
                  </option>
                  <option value="10">10:00</option>
                  <option value="11">11:00</option>
                  <option value="12">12:00</option>
                  <option value="13">13:00</option>
                  <option value="14">14:00</option>
                  <option value="15">15:00</option>
                  <option value="16">16:00</option>
                  <option value="17">17:00</option>
                  <option value="18">18:00</option>
                  <option value="19">19:00</option>
                  <option value="20">20:00</option>
                  <option value="21">21:00</option>
                  <option value="22">22:00</option>
                </select>
              </label>
            </form>
          </div>
          <div id="submit-datapicker">
            <input type="submit" value="Submit" onClick={this.handleFormSubmit} id="submit-datapicker" />
          </div>
        </div>
        <header className="header-clubs">
          <h3>Clubs still with available courts</h3>
        </header>
        {!isLoading &&
          clubs.map(club => {
            return (
              <div key={club._id}>
                <p>{club.name}</p>
                <Link id="home-book-btn-div" to={`/bookings/${club._id}`}>
                  <div id="home-book-btn">Book now</div>
                </Link>
              </div>
            );
          })}
      </div>
    );
  }
}

export default withAuth(Search);
