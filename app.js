const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { tourRouter } = require('./routes/tourRouter');
const { userRouter } = require('./routes/userRouter');

const app = express();

//1) Middlewares
if (process.env.NODE_ENV) {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//2) Routes
// app.get('/api/v1/tours', getAllTours);
// app.get(`/api/v1/tours/:id`, getTour);
// app.post('/api/v1/tours', postTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.use('/api/v1/tours', tourRouter);

app.use('/api/v1/users', userRouter);

module.exports = app;
