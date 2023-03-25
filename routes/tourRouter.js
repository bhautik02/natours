const express = require('express');
const {
  aliasTopTours,
  getAllTours,
  postTour,
  getTour,
  deleteTour,
  updateTour,
} = require('../controllers/tourController');

const tourRouter = express.Router();

tourRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours);

tourRouter.route('/').get(getAllTours).post(postTour);

tourRouter.route(`/:id`).get(getTour).delete(deleteTour).patch(updateTour);

module.exports = {
  tourRouter,
};
