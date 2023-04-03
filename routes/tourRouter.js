const express = require('express');
const {
  aliasTopTours,
  getAllTours,
  createTour,
  getTour,
  deleteTour,
  updateTour,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
} = require('../controllers/tourController');
const { protect, restrictTo } = require('./../controllers/authController');
const reviewRouter = require('./reviewRouter');

const tourRouter = express.Router();

tourRouter.use('/:tourId/reviews', reviewRouter);

tourRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours);
tourRouter.route('/tour-stats').get(getTourStats, getAllTours);
tourRouter
  .route('/monthly-plan/:year')
  .get(
    protect,
    restrictTo('admin', 'lead-guide', 'guide'),
    getMonthlyPlan,
    getAllTours
  );

tourRouter.route('/distances/:latlng/unit/:unit').get(getDistances);
tourRouter
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin);

tourRouter
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

// tourRouter
//   .route('/:tourId/reviews')
//   .post(protect, restrictTo('user'), addReviews);

module.exports = {
  tourRouter,
};
