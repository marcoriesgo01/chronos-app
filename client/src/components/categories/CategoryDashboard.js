import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";

class CategoryDashboard extends Component {

  state = {
    categorySelected: [],
    categoryUsers: []
  }

  componentDidMount() {
    const {category} = this.props.location.state;
    this.setState({categorySelected: category});
    this.getCategoryUsers();
  }

  getCategoryUsers = () =>  {
    const {category} = this.props.location.state;
    fetch('/api/users/' + category.name)
    .then(res => res.json())
    .then(jsonedUsers => this.setState({categoryUsers: jsonedUsers}))
    .catch( error => console.error(error))
  }

  // Logout
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  
  render() {

    const { auth } = this.props.auth;
    const {category} = this.props.location.state;
    // console.log(category)
    // console.log(this.props.auth.user)
    console.log(this.state.categorySelected.name)
    console.log(this.state.categoryUsers)
    
    return (
      <div id="category-main-container">
        <div>
          <h3 className="category-name">{category.name}</h3>
          <button onClick={this.onLogoutClick} className="btn waves-effect waves-light hoverable" id="log-out-button-category">
            Logout
          </button>
          <br />
          <Link to="/dashboard" className="btn waves-effect waves-light hoverable" id="dashboard-back-button">Back To Dashboard</Link>
          <h5 className="category-description">{category.description}</h5>
        </div>
        { this.state.categoryUsers.length === 0 ?
        <div className="no-users-message-container">
          <h5 className="no-users-message-text">There are currently no users in the {category.name} category, {this.props.auth.user.name.split(" ")[0]}.</h5>
        </div>
        :null }
        { this.state.categoryUsers.length > 0 ?
        <div className="category-users-container">
          {this.state.categoryUsers.map( user => {
              return (
                <Link to={{pathname: `/category/${category._id}/users/${user._id}`, state: {category: category, user: user}}}>
                  <div className="user-card">
                      <div className="user-card-image">
                          <img src={user.image} alt="category"/> 
                      </div>
                      <div className="user-card-content">
                          <h4>{user.name}</h4>
                          <h5>Years of Experience: {user.expertiseYears}</h5>
                          <h5>Expertise: {user.expertise}</h5>
                          <h6 className="view-user-to-contact">Click to View {user.name.split(" ")[0]}'s Profile</h6>
                          {/* <h5>Contact Email: <a href={`mailto:${user.email}`} id="email-link">{user.email}</a></h5>
                          <h5>Phone: <a href={`tel:${user.phone}`}>{user.phone}</a></h5> */}
                      </div>
                  </div>
                </Link>
              )
            })}
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