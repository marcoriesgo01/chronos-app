import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";


class Landing extends Component {
  componentDidMount() {
    // If logged in, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div style={{ height: "100vh" }}>
        <div className="landing-left-container">
          <h5 id="welcome-text">Welcome! On Chronos, you can now trade skills time with other users free of charge. Find other users offering what you need and trade your time for theirs!</h5>
          <Link to="/register" className="btn btn-large waves-effect hoverable" id="register-button">
            Register
          </Link>
          <br />
          <Link to="/login" className="btn btn-large waves-effect hoverable" id="log-in-button">
            Log In
          </Link>
        </div>
        <div className="landing-right-container">
          {/* <img src={landing} id="landing-image" alt="Landing" /> */}
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);