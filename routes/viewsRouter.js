const express = require('express');
const {
  getOverview,
  getTour,
  //   getLoginForm,
  //   updateUserData,
} = require('../controllers/viewsController');
const { isLoggedIn, protect } = require('../controllers/authController');

const viewRouter = express.Router();

viewRouter.get('/', getOverview);
viewRouter.get('/tour', getTour);

// viewRouter.route('/').get(isLoggedIn, getOverview);
// viewRouter.route('/tour/:slug').get(isLoggedIn, getTour);
// viewRouter.route('/login').get(isLoggedIn, getLoginForm);
// viewRouter.route('/me').get(protect, getAccount);

// viewRouter.route('/submit-user-data').post(protect, updateUserData);

module.exports = { viewRouter };
