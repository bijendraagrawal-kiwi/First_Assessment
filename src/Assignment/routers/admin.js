const express = require('express');
var adminRouter = express.Router();
const authentication = require('../middle/authentication');
const userMiddle = require('../middle/userMiddle');
const adminLogin = userMiddle.adminLogin;
const adminUpdateUser = userMiddle.adminUpdateUser;
const adminDeleteUser = userMiddle.adminDeleteUser;
const adminUserDetails = userMiddle.adminUserDetails;
const adminActiveUser = userMiddle.adminActiveUser;
const adminDeactiveUser = userMiddle.adminDeactiveUser;

adminRouter.get('/adminLogin', adminLogin);
adminRouter.put("/adminUpdateUser", authentication,adminUpdateUser);
adminRouter.get('/adminUserDetails', authentication,adminUserDetails);
adminRouter.delete("/adminDeleteUser", adminDeleteUser);
adminRouter.put("/deactivate", authentication,adminDeactiveUser);
adminRouter.put("/activate", authentication,adminActiveUser);

module.exports = adminRouter;