const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour name is not added.'],
      unique: true,
      trim: true,
      maxlength: [40, ' A name legth should not be more than 40 character.'],
      minlength: [10, ' A name legth should not be less than 10 character.'],
    },
    slug: String,
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'A difficulty must be either EASY, MEDIUM, or DIFFICULT',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4,
      min: [1.0, 'A Rating should be more than 1.0'],
      max: [5.0, 'A Rating should not be more than 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour price not Added.'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'A discountPrice ({VALUE}) should be less than actual price.',
      },
    },
    secretTour: {
      type: Boolean,
      default: false,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return Math.ceil(this.duration / 7);
});

//DOCUMENT MIDDLEWARE
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

//AGGREGATE MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
