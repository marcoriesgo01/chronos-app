import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { get } from "http";

import StarRatings from 'react-star-ratings';

class CategoryDashboard extends Component {

  state = {
    currentCategory: [],
    userProfile: [],
    userReviews: [],
    createReview: false,
    editReview: false,
    rating: 5,
    comment: "",
    editingReviewId: "",
    user: this.props.location.state.user.id
  }

  componentDidMount() {
    const {category} = this.props.location.state;
    const {user} = this.props.location.state;
    this.setState({currentCategory: category, userProfile: user});
    this.getUserReviews();
    // this.getCategoryUsers();
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

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

  //delete a review if its written by you
  deleteReview = id => {
    fetch('/api/reviews/' + id, {
      method: 'DELETE'
    }).then( res => {
      const reviewsArr = this.state.userReviews.filter( review => {
        return review.id !== id
      })
      this.setState({
        userReviews: reviewsArr
      })
    }).then(this.getUserReviews())
  }

  //Form Conditionals with state:
  handleOpenCreateReview = () => {
    this.setState({createReview: true, editReview: false})
  }

  handleOpenEditReview = (review) => {
    this.setState({createReview: false, 
      editReview: true, 
      rating: review.rating, 
      comment: review.comment, 
      editingReviewId: review._id
    })
  }

  handleCloseReviewForms = () => {
    this.setState({
      createReview: false, 
      editReview: false, 
      rating: 5, 
      comment:"", 
      editingReviewId: ""
    })
  }

  //submit review
  handleReviewSubmit = (event) => {
    event.preventDefault()
    const {user} = this.props.location.state;
    fetch('/api/reviews/create',{
    body: JSON.stringify({
      author: this.props.auth.user.id,
      authorName: this.props.auth.user.name,
      rating: this.state.rating,
      reviewedUser: user._id,
      comment: this.state.comment
    }),
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    this.setState({
        rating: 0,
        comment: ""
    })
  })
  .then(this.handleCloseReviewForms)
  .then(this.getUserReviews)
  .catch(error => console.error({ Error: error }));
}

//submit review edit:
handleEditReviewSubmit = (event) => {
  event.preventDefault()
  fetch('/api/reviews/' + this.state.editingReviewId,{
      body: JSON.stringify({
        author: this.props.auth.user.id,
        authorName: this.props.auth.user.name,
        rating: this.state.rating,
        reviewedUser: this.state.user,
        comment: this.state.comment
      }),
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(this.handleCloseReviewForms)
    .then(this.getUserReviews)
    .catch(error => console.error({ Error: error }));
}
  
  render() {

    // console.log(this.props.auth.user);
    const {category} = this.props.location.state;
    const {user} = this.props.location.state;
    // console.log(category)
    // console.log(this.props.auth.user)
    // console.log(category)
    // console.log(this.state.userProfile)
    // console.log(this.state.userReviews)

    console.log(this.state.editingReviewId)
    
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
                <button onClick={this.handleOpenCreateReview} className="btn waves-effect waves-light hoverable" id="create-review-button">
                  Post a Review
                </button>
              </div>
              { this.state.createReview ?
                  <form onSubmit={this.handleReviewSubmit}  className="review-form-parent-container">
                    <div className="form-left-container">
                      <div class="rating-form-div">
                        <select class="browser-default" 
                          onChange={this.handleChange}
                          id="rating"
                          name="rating"
                          type="number">
                          <option value="" disabled selected>Rating</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div className="comment-form-div">
                        <input type="text" id="comment" name="comment" className="validate" onChange={this.handleChange} placeholder="Comment" />
                      </div>
                    </div>
                    <div className="form-right-container">
                      <input type="submit" className="btn" id="enter-button" value="Enter"/>
                      <button onClick={this.handleCloseReviewForms} className="btn" id="cancel-button">
                        Cancel
                      </button>
                    </div>
                  </form>
              :null }
              { this.state.editReview ?
                  <form onSubmit={this.handleEditReviewSubmit}  className="review-form-parent-container">
                    <div className="form-left-container">
                      <div class="rating-form-div">
                        <select class="browser-default" 
                          onChange={this.handleChange}
                          id="rating"
                          name="rating"
                          type="number">
                          <option value="" disabled selected>{this.state.rating}</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div className="comment-form-div">
                        <input type="text" id="comment" name="comment" className="validate" onChange={this.handleChange} value={this.state.comment} />
                      </div>
                    </div>
                    <div className="form-right-container">
                      <input type="submit" className="btn" id="enter-button" value="Enter"/>
                      <button onClick={this.handleCloseReviewForms} className="btn" id="cancel-button">
                        Cancel
                      </button>
                    </div>
                  </form>
              :null }
              { this.state.userReviews.length < 1 ?
                <div className="no-user-reviews-container">
                  <h5 className="no-user-reviews-text-line-one">{user.name.split(" ")[0]} has no reviews yet.</h5>
                  <h5 className="no-user-reviews-text-line-two">Add a review to contribute to {user.name.split(" ")[0]}'s profile.</h5>
                </div>
              : null }
              { this.state.userReviews.length > 0 ?
                <div className="reviews-list-parent-container">
                  {this.state.userReviews.map( review => {
                    return (
                      <div className="review-item">
                          <div className="review-item-content">
                              <div className="review-item-top-content">
                                <div className="review-item-top-left-content">
                                  <h5>Written by {review.authorName}</h5>
                                </div>
                                <div className="review-item-top-right-content">
                                  <h5>  
                                    <StarRatings
                                      rating={review.rating}
                                      starRatedColor="#46ab9e"
                                      numberOfStars={5}
                                      starDimension="25px"
                                      name='rating'
                                    />
                                  </h5>
                                </div>
                              </div>
                              <div className="review-item-bottom-content">
                                <div className="review-item-bottom-left-content">
                                  <h5>{review.comment}</h5>
                                </div>
                                <div className="review-item-bottom-right-content">
                                  <button onClick={() => this.handleOpenEditReview(review)} className="btn btn-small btn-floating waves-effect waves-light hoverable" id="edit-review-button">
                                    <i className="material-icons">mode_edit</i>
                                  </button>
                                  <button onClick={() => this.deleteReview(review._id)} className="btn btn-small btn-floating waves-effect waves-light hoverable" id="trash-review-button">
                                    <i className="material-icons">delete</i>
                                  </button>
                                </div>
                              </div>
                          </div>
                      </div>
                    )
                  })}
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