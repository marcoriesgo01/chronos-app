import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { get } from "http";

class CategoryDashboard extends Component {

  state = {
    currentCategory: [],
    userProfile: [],
    userReviews: []
  }

  componentDidMount() {
    const {category} = this.props.location.state;
    const {user} = this.props.location.state;
    this.setState({currentCategory: category, userProfile: user});
    this.getUserReviews();
    // this.getCategoryUsers();
  }

  getUserReviews = () =>  {
    const {user} = this.props.location.state;
    fetch('/api/reviews/' + user._id)
    .then(res => res.json())
    .then(jsonedReviews => this.setState({userReviews: jsonedReviews}))
    .catch( error => console.error(error))
  }

  // Logout
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  handleBack = () => {
    this.props.history.goBack()
  }
  
  render() {

    console.log(this.props.auth.user);
    const {category} = this.props.location.state;
    const {user} = this.props.location.state;
    // console.log(category)
    // console.log(this.props.auth.user)
    console.log(category)
    console.log(user)
    console.log(this.state.userProfile)
    console.log(this.state.userReviews)
    
    return (
      <div id="category-main-container">
        <div>
          <button onClick={this.onLogoutClick} className="btn waves-effect waves-light hoverable" id="log-out-button-category">
            Logout
          </button>
          <button onClick={this.handleBack} className="btn waves-effect waves-light hoverable" id="dashboard-profile-back-button">
            Back to {category.name}
          </button>
        </div>
        { this.state.userProfile == undefined ?
        <div className="no-users-message-container">
          <h5 className="no-users-message-text">Could not retrieve information for {user.name}.</h5>
        </div>
        :null }
        { this.state.userProfile ?
        <div className="profile-container">
            <div className="user-profile-info-container">
                <div className="user-profile-left-container">
                    <img src={user.image} alt="profile picture"/> 
                    <h4>{user.name}</h4>
                </div>
                <div className="user-profile-right-container">
                    <h5>Works in {category.name}</h5>
                    <h5>Years of Experience: {user.expertiseYears}</h5>
                    <h5>Expertise: {user.expertise}</h5>
                    <h5>
                      <a href={`mailto:${user.email}`}>
                        <div id="profile-contact-icon">
                          <i class="small material-icons">email</i>
                        </div>
                        <div id="profile-contact-icon-text">
                          <h5>Email {user.name.split(" ")[0]} at {user.email}</h5>
                        </div>
                      </a>
                    </h5>
                    <h5>
                      <a href={`tel:${user.phone}`}>
                        <div id="profile-contact-icon">
                          <i class="small material-icons">call</i>
                        </div>
                        <div id="profile-contact-icon-text">
                          <h5>Call {user.name.split(" ")[0]} at {user.phone}</h5>
                        </div>
                      </a>
                    </h5>
                </div>
                <hr id="profile-view-hr"/>
            </div>
            <div className="user-profile-messages-container">
              <div className="user-reviews-title-name-container">
                <h4 id="message-board-title">{user.name.split(" ")[0]}'s Reviews</h4>
              </div>
              <div className="user-reviews-title-button-container">
                <button onClick={this.onLogoutClick} className="btn waves-effect waves-light hoverable" id="create-review-button">
                  Post a Review
                </button>
              </div>
              { this.state.userReviews.length >= 1 ?
                <div className="no-user-reviews-container">
                  <h5 className="no-user-reviews-text-line-one">{user.name.split(" ")[0]} has no reviews yet.</h5>
                  <h5 className="no-user-reviews-text-line-two">Add a review to contribute to {user.name.split(" ")[0]}'s profile.</h5>
                </div>
              : null }
            </div>
        </div>
        :null }   
      </div> 
    );
  }
}

CategoryDashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(CategoryDashboard);