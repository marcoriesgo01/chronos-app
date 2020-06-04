import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import Spinner from "./Spinner";

class Dashboard extends Component {

  state = {
    categories: []
  }

  // componentDidMount() {
  //   this.props.getAccounts();
  // }

  // // Logout
  // onLogoutClick = e => {
  //   e.preventDefault();
  //   this.props.logoutUser();
  // };


  // // Add account
  // handleOnSuccess = (token, metadata) => {
  //   const plaidData = {
  //     public_token: token,
  //     metadata: metadata
  //   };
  //   this.props.addAccount(plaidData);
  // };

  render() {
    const { user } = this.props.auth;
    const { categories } = this.state.categories;
    let dashboardContent;
    if (this.state.categories.length === 0 ) {
      dashboardContent = <Spinner />;
      dashboardContent = <p className="center-align">Loading...</p>;
    } else {
      // User has no accounts linked
      dashboardContent = (
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Welcome,</b> {user.name.split(" ")[0]}
            </h4>
            <button onClick={this.onLogoutClick} className="btn btn-large waves-effect waves-light hoverable" id="log-in-button">
              Logout
            </button>
          </div>
        </div>
      );
    }
  return <div className="container">{dashboardContent}</div>;
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