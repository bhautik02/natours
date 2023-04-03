const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const { deleteOne, updateOne, getOne, getAll } = require('./handlerFactory');

const filterObj = (obj, ...allowedFileds) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFileds.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

const updateMe = catchAsync(async (req, res, next) => {
  // 1)check if it has a password and confirm password field
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'for change a password go to the route /forgotPassword.',
        400
      )
    );
  }

  // 2) update the document
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'For create a user go to /signup..',
  });
};

const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

const getAllUsers = getAll(User);
const getUser = getOne(User);
const updateUser = updateOne(User);
const deleteUser = deleteOne(User);

module.exports = {
  getAllUsers,
  updateMe,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  deleteMe,
  getMe,
};
