const express = require('express');
const {
  checkId,
  checkBody,
  getAllTours,
  postTour,
  getTour,
  deleteTour,
} = require('../controllers/tourController');

const tourRouter = express.Router();

tourRouter.param('id', checkId);

tourRouter.route('/').get(getAllTours).post(checkBody, postTour);

tourRouter.route(`/:id`).get(getTour).delete(deleteTour);

module.exports = {
  tourRouter,
};
