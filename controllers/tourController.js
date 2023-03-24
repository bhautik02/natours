const fs = require('fs');
const path = require('path');
const Tour = require('../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(
//     path.join(__dirname, '..', 'dev-data', 'data', 'tours-simple.json')
//   )
// );

const checkId = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  // if (+req.params.id > tours.length) {
  //   return res.status(404).json({
  //     status: 'error',
  //     message: 'Invalid id...',
  //   });
  // }
  next();
};

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'error',
      message: 'Name or Price Missing...',
    });
  }
  next();
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

const getTour = (req, res) => {
  const id = +req.params.id;
  // const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    // data: {
    //   tour,
    // },
  });
};

const postTour = (req, res) => {
  console.log(req.body);

  // const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  console.log(newTour);
  // tours.push(newTour);

  // fs.writeFile(
  //   './dev-data/data/tours-simple.json',
  //   JSON.stringify(tours),
  //   () => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   }
  // );
};

const deleteTour = (req, res) => {
  // const id = +req.params.id;

  res.status(204).json({
    status: 'success',
    message: 'null',
  });
};

module.exports = {
  checkId,
  checkBody,
  getAllTours,
  getTour,
  postTour,
  deleteTour,
};
