const express = require('express');

const {
  getAllUsers,
  postUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { signUp, login } = require('../controllers/authController');

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', login);

userRouter.route('/').get(getAllUsers).post(postUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = {
  userRouter,
};
