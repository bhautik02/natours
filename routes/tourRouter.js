const express = require('express');
const {
  aliasTopTours,
  getAllTours,
  postTour,
  getTour,
  deleteTour,
  updateTour,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController');
const { protect } = require('./../controllers/authController');

const tourRouter = express.Router();

tourRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours);
tourRouter.route('/tour-stats').get(getTourStats, getAllTours);
tourRouter.route('/monthly-plan/:year').get(getMonthlyPlan, getAllTours);

tourRouter.route('/').get(protect, getAllTours).post(postTour);

tourRouter.route(`/:id`).get(getTour).delete(deleteTour).patch(updateTour);

module.exports = {
  tourRouter,
};
