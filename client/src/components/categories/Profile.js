import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";

class CategoryDashboard extends Component {

  state = {
    currentCategory: [],
    userProfile: []
  }

  componentDidMount() {
    const {category} = this.props.location.state;
    const {user} = this.props.location.state;
    this.setState({currentCategory: category, userProfile: user});
    // this.getCategoryUsers();
  }

//   getCategoryUsers = () =>  {
//     const {category} = this.props.location.state;
//     fetch('/api/users/' + category.name)
//     .then(res => res.json())
//     .then(jsonedUsers => this.setState({categoryUsers: jsonedUsers}))
//     .catch( error => console.error(error))
//   }

  // Logout
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  handleBack = () => {
    this.props.history.goBack()
  }
  
  render() {

    const { auth } = this.props.auth;
    const {category} = this.props.location.state;
    const {user} = this.props.location.state;
    // console.log(category)
    // console.log(this.props.auth.user)
    console.log(category)
    console.log(this.state.userProfile)
    
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
                    <h5><a href={`mailto:${user.email}`} id="email-link">Click to email {user.name.split(" ")[0]} at {user.email}</a></h5>
                    <h5><a href={`tel:${user.phone}`}>Click to call {user.name.split(" ")[0]} at {user.phone}</a></h5>
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