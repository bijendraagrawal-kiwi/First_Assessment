const express = require('express');
var postRouter = express.Router();
const schema = require('../schema/postSchema.js');
const postSchema = schema.post();
const mongoose = require('mongoose');
const post = mongoose.model('post', postSchema);
const authentication = require('../middle/authentication');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const uploadfile = multer({
    storage: multer.diskStorage({

        destination: (req, file, callback) => {

            callback(null, 'upload/');
        },
        filename: (req, file, callback) => {

            callback(null, file.originalname);
        }
    })
});


//here user can create his own post after login 
postRouter.post('/createPost', authentication, uploadfile.single('user_file'), async (req, res) => {

    console.log(req.file);

    if (req.file != undefined) {
        const p = new post({

            user_Id: req.body.user_id,
            image: {
                data: fs.readFileSync(path.join(__dirname, "../upload/", req.file.filename)),
                contentType: "text/image"
            },
            title: req.body.title,
            description: req.body.description

        });

        const obj = await p.save();
        console.log(obj);
        res.send(obj);

    }
    else {
        const p = new post({

            user_Id: req.body.user_id,
            title: req.body.title,
            description: req.body.description

        });

        const obj = await p.save();
        console.log(obj);
        res.send(obj);
    }

});

//view post by the user
postRouter.get('/userPost', authentication, (req, res) => {

    post.find({user_Id : req.body.user_Id}).then((value) => {

        console.log(value);
        res.send(value);
    });
});

//Updation in the post by user after login authentication
postRouter.put("/updatePost",authentication, async (req, res) => {

    post.findOneAndUpdate({ _id : req.body._id}, { $set: { title: req.body.title, description: req.body.description, user_Id : req.body.user_id} }).then((value) => {
        try {
            console.log(value);
            res.send(value);
        }
        catch (err) {
            console.log(err);
            res.send(err);
        }
    });
});


module.exports = postRouter;