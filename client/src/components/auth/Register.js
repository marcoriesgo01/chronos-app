import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";



class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      image: "",
      email: "",
      phone: "",
      categoryId: "",
      expertiseYears: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }


  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };


  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      image: this.state.image,
      email: this.state.email,
      phone: this.state.phone,
      categoryId: this.state.categoryId,
      expertiseYears: this.state.expertiseYears,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history); 
};


  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4 className="register-title"><b>Register</b></h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.image}
                  error={errors.image}
                  id="image"
                  type="text"
                  className={classnames("", {
                    invalid: errors.image
                  })}
                />
                <label htmlFor="name">Image URL</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.phone}
                  error={errors.phone}
                  id="phone"
                  type="text"
                  className={classnames("", {
                    invalid: errors.phone
                  })}
                />
                <label htmlFor="name">Phone Number</label>
                <span className="red-text">{errors.phone}</span>
              </div>
              <div class="input-field col s12">
                <select class="browser-default" 
                  onChange={this.onChange}
                  value={this.state.categoryId}
                  error={errors.name}
                  id="categoryId"
                  type="text">
                  <option value="" disabled selected>What service can you offer others?</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Housekeeping">Housekeeping</option>
                  <option value="Gardening">Gardening</option>
                  <option value="Pet Care">Pet Care</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Child Care">Child Care</option>
                  <option value="Tutoring">Tutoring</option>
                  <option value="Translation">Translation</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Handyman">Handyman</option>
                </select>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.expertiseYears}
                  error={errors.expertiseYears}
                  id="expertiseYears"
                  type="text"
                  className={classnames("", {
                    invalid: errors.expertiseYears
                  })}
                />
                <label htmlFor="name">Years of Expertise</label>
                <span className="red-text">{errors.expertiseYears}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button type="submit" className="btn btn-large waves-effect waves-light hoverable" id="register-button">
                  Sign up
                </button>
                <br />
                <Link to="/" className="btn btn-large waves-effect waves-light hoverable" id="cancel-register-button">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));