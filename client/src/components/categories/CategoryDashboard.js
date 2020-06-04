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

  // handleChange = event => {
  //   this.setState({ [event.target.id]: event.target.value });
  // };

  
  // getBudgets = () => {
  //   fetch('/api/budgets/' + this.state.user.user.id)
  //   .then(res => res.json())
  //   .then(jsonedBudgets => this.setState({budgets: jsonedBudgets}))
  //   .catch( error => console.error(error))
  // }

  // handleBudgetSubmit = (event) => {
  //     event.preventDefault()
  //     fetch('/api/budgets/create',{
  //     body: JSON.stringify({
  //       userId: this.state.user.user.id,
  //       name: this.state.name,
  //       amount: this.state.amount
  //     }),
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json, text/plain, */*',
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(res => {
  //     this.setState({
  //         name: '',
  //         amount: ''
  //     })
  //   })
  //   .then(this.handleCloseBudgetForm)
  //   .then(this.getBudgets)
  //   .catch(error => console.error({ Error: error }));
  // }

  
  
  // Logout
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  // //Form conditionals

  // handleOpenBudgetForm = () => {
  //   this.setState({addBudget: true})
  //   this.handleCloseEditForm()
  // }

  // handleCloseBudgetForm = () => {
  //   this.setState({addBudget: false})
  // }

  // deleteBudget = id => {
  //   fetch('/api/budgets/' + id, {
  //     method: 'DELETE'
  //   }).then( res => {
  //     const budgetsArr = this.state.budgets.filter( budget => {
  //       return budget.id !== id
  //     })
  //     this.setState({
  //       budgets: budgetsArr
  //     })
  //   }).then(this.getBudgets())
  // }

  // handleEditForm = (budget) => {
  //   this.setState({
  //     editBudget: true,
  //     addBudget: false,
  //     budgetId: budget._id,
  //     name: budget.name,
  //     amount: budget.amount

  //   })
  // }

  // handleCloseEditForm = () => {
  //   this.setState({
  //     editBudget: false,
  //     budgetId: "",
  //     name: "",
  //     amount: ""
  //   })
  // }

  // handleEditBudgetSubmit = () => {
  //   fetch('/api/budgets/' + this.state.budgetId,{
  //       body: JSON.stringify({
  //         userId: this.state.user.user.id,
  //         name: this.state.name,
  //         amount: this.state.amount
  //       }),
  //       method: 'PUT',
  //       headers: {
  //         'Accept': 'application/json, text/plain, */*',
  //         'Content-Type': 'application/json'
  //       }
  //     })  
  //     .then(this.handleCloseEditBudgetForm)
  //     .then(this.getBudgets)
  //     .catch(error => console.error({ Error: error }));
  // }



  
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
          <h5 className="category-description">{category.description}</h5>
        </div>
        { this.state.categoryUsers.length === 0 ?
        <div className="no-users-message-container">
          <h5 className="no-users-message-text">There are currently no users in the {category.name} category, {this.props.auth.user.name.split(" ")[0]}.</h5>
        </div>
        :null }
        {/* <div className="category-container">
            <Link to="/dashboard" className="btn waves-effect waves-light hoverable" id="dashboard-back-button">Back To Dashboard</Link>
            <button onClick={this.onLogoutClick} className="btn waves-effect waves-light hoverable" id="accounts-log-out-button">
              Logout
            </button>
            <h5 className="category-introduction">Here are your budgets for the next 30 days, {user.name.split(" ")[0]}.</h5>
            <h6 className="category-introduction-small-text">Create and manage your monthly budgets to keep track of how much you can spend each month.</h6>
            <button onClick={this.handleOpenBudgetForm} className="btn waves-effect waves-light hoverable" id="dashboard-back-button">
              Add A New Budget
            </button>
        </div>
        { this.state.addBudget ?
        <div className="category-container">
          <div className="row">
            <form className="col s12" onSubmit={this.handleBudgetSubmit}>
              <div className="row">
                <div className="input-field col s4">
                  <input type="text" id="name" name="name" className="validate" onChange={this.handleChange}/>
                  <label htmlFor="category">Category Name</label>
                </div> 
                <div className="input-field col s2">
                  <input type="text" id="amount" name="amount" className="validate" onChange={this.handleChange} />
                  <label htmlFor="amount">Budget</label>
                </div>
                <input type="submit" className="btn" id="budget-form-button" value="Enter"/>
                <button onClick={this.handleCloseBudgetForm} className="btn" id="budget-form-cancel-button">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        :null }
        { this.state.editBudget ?
        <div className="category-container">
          <div className="row">
            <form className="col s12" onSubmit={this.handleEditBudgetSubmit}>
              <div className="row">
                <div className="input-field col s4">
                  <input type="text" id="name" name="name" className="validate" onChange={this.handleChange} value={this.state.name}/>
                </div> 
                <div className="input-field col s2">
                  <input type="text" id="amount" name="amount" className="validate" onChange={this.handleChange} value={this.state.amount}/>
                </div>
                <input type="submit" className="btn" id="budget-form-button" value="Submit"/>
                <button onClick={this.handleCloseEditBudgetForm} className="btn" id="budget-form-cancel-button">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        :null }
        { this.state.budgets.length === 0 ?
        <div className="no-budget-warning">
          <h5>You have not added any budgets yet, {user.name.split(" ")[0]}.</h5>
          <h6>Create new ones to begin analyzing your monthly finances.</h6>
        </div>
        :null }
        { this.state.budgets.length > 0 ?
        <div className="budget-list-container">
        {this.state.budgets.map( budget => {
            return (
            <div>
            <div className="budget-list-card">
                <div key={budget._id}>
                    <h5 className="budget-name">{budget.name}</h5>
                    <div className="budget-info-container">
                    <h5 className="budget-amount">${parseFloat(budget.amount).toLocaleString('en')}</h5>
                    <button onClick={() => this.handleEditForm(budget)} className="btn btn-small btn-floating waves-effect waves-light hoverable" id="edit-budget-button">
                      <i className="material-icons">mode_edit</i>
                    </button>
                    <button onClick={() => this.deleteBudget(budget._id)} className="btn btn-small btn-floating waves-effect waves-light hoverable" id="trash-budget-button">
                      <i className="material-icons">delete</i>
                    </button>
                    </div>
                </div> 
            </div>
            <br />
            </div>
            )
        })}
        <hr />
        <div className="total-budget-list-card">
          <h5 className="total-budget-name">Total 30 Day Budget:</h5>
          <div className="budget-info-container">
            <h5 className="total-budget-amount">${totalBudget}</h5>
          </div>
        </div>
        </div>
        :null }
        { this.state.budgets.length > 0 ?
        <div className="budget-pie-container">
          <h4 className="chart-title">Here's Your Budget Distribution</h4>
        </div>
        :null } */}
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