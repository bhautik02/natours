const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');

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
      set: (val) => Math.round(val * 10) / 10,
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
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
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
    guide: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });

tourSchema.virtual('durationWeeks').get(function () {
  return Math.ceil(this.duration / 7);
});

tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

//DOCUMENT MIDDLEWARE
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', async function (next) {
//   const guidePromises = this.guide.map(async (id) => await User.findById(id));
//   this.guide = await Promise.all(guidePromises);
//   next();
// });

//QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

// //AGGREGATE MIDDLEWARE
// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   next();
// });

//populate tour childs
tourSchema.pre(/^find/g, function (next) {
  this.populate({
    path: 'guide',
    select: '-__v -passwordChangedAt',
  });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
