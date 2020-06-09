import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

import Spinner from "./Spinner";



class Dashboard extends Component {

  state = {
    categories: []
  }

  componentDidMount() {
    this.getAllCategories();
  }

  getAllCategories = () => {
    fetch('/api/categories/')
    .then(res => res.json())
    .then(jsonedCategories => this.setState({categories: jsonedCategories}))
    .catch( error => console.error(error))
  }


  // Logout
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="row">
        <div className="dashboard-nav-header">
          <h4 className="welcome-user">
            Welcome, {user.name.split(" ")[0]}
          </h4>
          <button onClick={this.onLogoutClick} className="btn waves-effect waves-light hoverable" id="log-out-button">
            Logout
          </button>
          <h5 id="how-help-text">What are you hoping to find today?</h5>
        </div>
        <div className="categories-container">
        {this.state.categories.map( category => {
            return (
              <Link to={{pathname: `/category/${category._id}`, state: {category: category}}}>
              <div className="card">
                  <div className="card-image">
                      <img src={category.image} alt="category"/>
                  </div>
                  <div className="card-content">
                      <h5>{category.name}</h5>
                  </div>
              </div>
            </Link>
            )
          })}
        </div>
      </div>
    );
    
 }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);