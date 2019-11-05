import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';

class Navbar extends Component {
  render() {
    return (
      <div className="nav-container">
        <nav>
          <ul>
            {this.props.isLoggedIn ? null : (
              <>
                <li>
                  <Link to="/bookings">
                    <img src={'/images/booking.svg'} alt="Booking" />
                    Bookings
                  </Link>
                </li>

                <li>
                  <Link to="/search">
                    <img src={'/images/search.svg'} alt="Search" />
                    Search
                  </Link>
                </li>

                <li>
                  <Link to="/profile">
                    <img src={'/images/profile.svg'} alt="Profile" />
                    Profile
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    );
  }
}

export default withAuth(Navbar);