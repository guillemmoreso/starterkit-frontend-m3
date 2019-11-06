import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';
import clubsService from '../../services/clubsService';

class ClubsCards extends Component {
  state = {
    clubs: [],
    userClubs: this.props.user.clubs,
    isLoading: true,
  };

  async componentDidMount() {
    try {
      const clubs = await clubsService.getAllClubs();
      this.setState({
        clubs,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  saveClub = id => {
    clubsService.saveClubToFavorites(id).then(response => {
      this.setState({
        userClubs: response.updatedUser.clubs,
      });
    });
  };

  render() {
    const { clubs, isLoading, userClubs } = this.state;
    return (
      <>
        {!isLoading &&
          clubs.map(club => {
            return (
              <div id="highlight-clubs-card" key={club._id}>
                <img id="highlight-clubs-card-img" src={club.clubImages[0]} alt="club-avatar"></img>
                {userClubs.includes(club._id) ? (
                  <span
                    className="heart"
                    onClick={() => {
                      this.saveClub(club._id);
                    }}
                  >
                    <img src="/images/heart-circle-full.svg" alt="Spot saved" />
                  </span>
                ) : (
                  <span
                    className="heart"
                    onClick={() => {
                      this.saveClub(club._id);
                    }}
                  >
                    <img src="/images/heart-circle-empty.svg" alt="Spot saved" />
                  </span>
                )}
                <div id="highlight-clubs-card-content">
                  <h1 id="club-name-card">{club.name}</h1>
                  <p id="home-club-text">{club.location}</p>

                  {/* <Link id="home-book-btn-div" to="/login"> */}
                  <Link id="home-book-btn-div" to={`/clubs/${club._id}`}>
                    <div id="home-book-btn">Book now</div>
                  </Link>
                </div>
              </div>
            );
          })}
      </>
    );
  }
}

export default withAuth(ClubsCards);