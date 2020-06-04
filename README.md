# Electrum

### Heroku Hosted Electrum App Link:
https://electrum-finance.herokuapp.com/

### Link to Frontend Github Repository:
https://github.com/marcoriesgo01/electrum-client

### Link to Backend Github Repository:
https://github.com/marcoriesgo01/electrum-api

Electrum is an all-in-one personal finance application for users to link their bank accounts and analyze all of their financial data. Electrum users are able to link and analyze their bank transactions, create and optimize monthly budgets, review monthly bills, and track their investments in real-time. 

## Technologies Used
* HTML 
* CSS 
* React 
* React Router
* [Materialize](https://materializecss.com/)
* Node.js
* MongoDB
* Express
* [Redux](https://redux.js.org/) - Used for state management on banking and authorization
* Axios - Used for connecting to the API for authorization and banking
* JWT Authorization
* Passport
* Mongoose
* [Plaid API](https://plaid.com/) - Used for connecting user bank accounts to Electrum
* Moment.js - Used for expirations and bank transaction dates
* [Chart.js](https://www.chartjs.org/) - Used to analyze the user's financial data
* [IEX Cloud API](https://iexcloud.io/) - Used to analyze user's investments and their current value
* [Validator](https://www.npmjs.com/package/validator) - Used to verify that user information is valid.


### Problem: 
There is currently no single app for users to organize all of their personal finances. Users need to use multiple applications with different information, which is time-consuming and confusing.

### General App Idea/Purpose: 
An app that allows users to securely organize all of their personal finances including budgeting, expenses, recurring bills, and investments in one single application.

### Who Would Use It: 
People in the United States with financial assets in need of organization. Users who do not want too have their financial information distributed among different applications.

## Approach taken:
* Models: 
    * Bills
    * Budgets
    * Expenses
    * Investments
    * Plaid
    * Users
* Relationships: Each of the models above is related to a specific user in order for authorization to work efficiently.

### Installation Instructions
For live demo purposes, use the following credentials when prompted to link a bank account with Plaid:
Username: user_good
Password: pass_good

To clone repo:
* git clone
* npm install

### Trello User Stories:
[User Stories - Electrum](https://trello.com/b/60ZlDlbf/electrum-stories)

### Electrum Wireframes: 
![Wireframe 1](https://github.com/marcoriesgo01/electrum-client/blob/master/src/img/wireframe1.png?raw=true)

![Wireframe 2](https://github.com/marcoriesgo01/electrum-client/blob/master/src/img/wireframe2.png?raw=true)

![Wireframe 3](https://github.com/marcoriesgo01/electrum-client/blob/master/src/img/wireframe3.png?raw=true)

### Useful Links:

[React Router Protected Routes](https://tylermcginnis.com/react-router-protected-routes-authentication/)
