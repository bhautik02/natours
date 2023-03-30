const express = require('express');

const {
  getAllUsers,
  postUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
} = require('../controllers/userController');
const {
  protect,
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('../controllers/authController');

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', login);

userRouter.post('/forgotPassword', forgotPassword);
userRouter.patch('/resetPassword/:token', resetPassword);

userRouter.patch('/updateMyPassword', protect, updatePassword);
userRouter.patch('/updateMe', protect, updateMe);
userRouter.delete('/deleteMe', protect, deleteMe);

userRouter.route('/').get(getAllUsers).post(postUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = {
  userRouter,
};
