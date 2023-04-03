const Review = require('./../models/reviewModel');
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handlerFactory');

const setTourandUser = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.tour) req.body.tour = req.params.tourId;
  next();
};

const getAllReviews = getAll(Review);
const getReview = getOne(Review);
const deleteReview = deleteOne(Review);
const updateReview = updateOne(Review);
const createReview = createOne(Review);

module.exports = {
  getAllReviews,
  createReview,
  getReview,
  setTourandUser,
  deleteReview,
  updateReview,
};
