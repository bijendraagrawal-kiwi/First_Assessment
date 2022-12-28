const express = require('express');
var userRouter = express.Router();
const authentication = require('../middle/authentication');
const userMiddle = require('../middle/userMiddle');
const userLogin = userMiddle.userLogin;
const userSignup = userMiddle.userSignup;
const userUpdate = userMiddle.userUpdate;
userRouter.post("/signUp",userSignup);
userRouter.get('/login',userLogin);
userRouter.put("/updateUser",authentication,userUpdate);

module.exports = userRouter;