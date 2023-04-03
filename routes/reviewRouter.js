const express = require('express');
const { protect, restrictTo } = require('./../controllers/authController');

const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourandUser,
  getReview,
} = require('./../controllers/reviewController');

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.use(protect);

reviewRouter
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourandUser, createReview);

reviewRouter
  .route('/:id')
  .get(getReview)
  .delete(restrictTo('admin', 'user'), deleteReview)
  .patch(restrictTo('admin', 'user'), updateReview);

module.exports = reviewRouter;
