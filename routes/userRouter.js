const express = require('express');

const {
  getAllUsers,
  createUser,
  getUser,
  getMe,
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
  restrictTo,
} = require('../controllers/authController');
const { getOne } = require('../controllers/handlerFactory');

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', login);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.patch('/resetPassword/:token', resetPassword);

userRouter.use(protect);

userRouter.get('/me', getMe, getUser);
userRouter.patch('/updateMyPassword', updatePassword);
userRouter.patch('/updateMe', updateMe);
userRouter.delete('/deleteMe', deleteMe);

userRouter.use(restrictTo('admin'));

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = {
  userRouter,
};
