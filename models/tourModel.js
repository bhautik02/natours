const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour name is not added.'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4,
  },
  price: {
    type: Number,
    required: [true, 'A tour price not Added.'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
