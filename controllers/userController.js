const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');

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
  postUser,
  getUser,
  updateUser,
  deleteUser,
};
