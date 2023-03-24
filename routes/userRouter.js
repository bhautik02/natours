const express = require('express');

const {
  getAllUsers,
  postUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(postUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = {
  userRouter,
};
