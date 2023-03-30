const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedFileds) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFileds.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

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

const postUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined...',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined...',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined...',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined...',
  });
};

module.exports = {
  getAllUsers,
  updateMe,
  postUser,
  getUser,
  updateUser,
  deleteUser,
  deleteMe,
};
