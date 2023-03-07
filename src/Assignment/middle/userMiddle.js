const bcryptjs = require('bcryptjs');
const schema = require('../schema/userSchema.js');
const schemaDraft = schema.schemaDraft();
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const user = mongoose.model('user', schemaDraft);
const joi = require('joi');
const joiSignupSchema = joi.object({
    email: joi.string().email().min(8).required(),
    name: joi.string().min(3).max(20).required(),
    password: joi.string().min(8).required(),
    phone_number: joi.string().min(9).max(14).required(),
    address: joi.string().min(10).max(50).required()
});
const joiLoginSchema = joi.object({
    email: joi.string().email().min(8).required(),
    password: joi.string().min(8).required()
})


const userSignup = function (req, res, next) {


    const object = joiSignupSchema.validate({ email: req.body.email, name: req.body.name, password: req.body.password, phone_number: req.body.phone_number, address: req.body.address });
    if (object.error != undefined) {
        console.log(object.error.details[0].message);
        res.send(object.error.details[0].message);
    }
    else {
        user.findOne(({ email: req.body.email }), async (err, val) => {

            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                if (val != null) {
                    console.log("User from " + req.body.email + " is already exist ");
                    res.send("User from " + req.body.email + " is already exist ");
                }
                else {
                    const salt = await bcryptjs.genSalt(10);
                    const securePassword = await bcryptjs.hash(req.body.password, salt);

                    const doc = new user({


                        email: req.body.email,
                        name: req.body.name,
                        password: securePassword,
                        phone_number: req.body.phone_number,
                        address: req.body.address,
                        active: true
                    });

                    const obj = await doc.save();
                    console.log("User has been saved");
                    res.send("User has been saved");
                }
            }
        });
    }
}


const userLogin = function (req, res, next) {

    const object = joiLoginSchema.validate({ email: req.body.email, password: req.body.password });

    if (object.error != undefined) {
        console.log(object.error.details[0].message);
        res.send(object.error.details[0].message);
    }
    else {

        user.findOne(({ email: req.body.email }), async (err, val) => {

            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                if (val == null) {
                    console.log("Here is no data for your login");
                    res.send("Here is no data for your login");
                }
                else {
                    if (val.active) {
                        const password = req.body.password;
                        const databasePassword = val.password;

                        const bool = await bcryptjs.compare(password, databasePassword);
                        if (bool) {
                            const token = jwt.sign({ email: req.body.email }, "SecureKey");
                            console.log(val);
                            res.send({
                                token: token,
                                userInformation: val
                            });
                        }
                        else {
                            res.send("Password does not match");
                            console.log("password does not match");
                        }
                    }
                    else {
                        console.log("User is not active");
                        res.send("User is not active");
                    }
                }
            }
        });
    }
}

const userUpdate = function (req, res, next) {

    user.findOneAndUpdate({ email: req.body.email }, { $set: { name: req.body.name, password: req.body.password, phone_number: req.body.phone_number, address: req.body.address } }).then((value) => {
        try {
            console.log("Information has been updated");
            res.send("Information has been updated");
        }
        catch (err) {
            console.log(err);
            res.send(err);
        }
    });
}


const adminUpdateUser = function (req, res) {

    user.findOneAndUpdate({ email: req.body.email }, { $set: { name: req.body.name, password: req.body.password, phone_number: req.body.phone_number, address: req.body.address } }).then((value) => {
        try {
            console.log("Information has been updated");
            res.send("Information has been updated");
        }
        catch (err) {
            console.log(err);
            res.send(err);
        }
    });
}

const adminUserDetails = function (req, res) {

    user.find().then((value) => {

        try {
            console.log(value);
            res.send(value);
        }
        catch (err) {
            console.log(err);
            res.send(err);
        }
    });
}

const adminDeleteUser = function (req, res) {
    user.deleteOne(({ email: req.body.email }), (err, val) => {

        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            if (val.deletedCount == 0) {
                console.log("There is nothing for delete , Please enter other email for deletion");
                res.send("There is nothing for delete , Please enter other email for deletion");
            }
            else {
                console.log("Data has been deleted");
                res.send("Data has been deleted");
            }
        }
    });
}

const adminLogin = function (req, res) {
    const object = joiLoginSchema.validate({ email: req.body.email, password: req.body.password });

    if (object.error != undefined) {

        console.log(object.error.details[0].message);
        res.send(object.error.details[0].message);
    }
    else {
        const adminEmail = "admin@gmail.com";
        const adminPassword = "Admin@123";

        if (req.body.email == adminEmail) {

            if (req.body.password == adminPassword) {
                const token = jwt.sign({ email: req.body.email }, "SecureKey");
                console.log(token);
                res.send(token);
            }
            else {
                res.send("Admin password does not match");
                console.log("Admin password does not match");
            }

        }
        else {
            res.send("Admin email does not match");
            console.log("Admin email does not match");
        }

    }
}


const adminActiveUser = function (req, res) {

    user.findOneAndUpdate({ email: req.body.email }, { $set: { active : true } }).then((value) => {
        try {
            console.log("User has been activated");
            res.send("User has been activated");
        }
        catch (err) {
            console.log(err);
            res.send(err);
        }
    });
}

const adminDeactiveUser = function (req, res) {

    user.findOneAndUpdate({ email: req.body.email }, { $set: { active : false } }).then((value) => {
        try {
            console.log("User has been deactivated");
            res.send("User has been deactivated");
        }
        catch (err) {
            console.log(err);
            res.send(err);
        }
    });
}

module.exports.adminDeactiveUser = adminDeactiveUser;
module.exports.adminActiveUser = adminActiveUser;
module.exports.adminLogin = adminLogin;
module.exports.adminDeleteUser = adminDeleteUser;
module.exports.adminUserDetails = adminUserDetails;
module.exports.adminUpdateUser = adminUpdateUser;
module.exports.userUpdate = userUpdate;
module.exports.userLogin = userLogin;
module.exports.userSignup = userSignup;