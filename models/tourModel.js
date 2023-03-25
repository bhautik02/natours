const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour name is not added.'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A duration is empty...'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A maximaum group quantity is empty...'],
  },
  difficulty: {
    type: String,
    required: [true, 'A Difficulty is empty...'],
  },
  ratingsAverage: {
    type: Number,
    default: 4,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour price not Added.'],
  },
  summary: {
    type: String,
    required: [true, 'A summary is empty...'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A Imagecover is empty...'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: {
    type: [Date],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
