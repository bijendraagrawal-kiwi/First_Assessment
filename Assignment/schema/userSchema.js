
const schema = () => {

    const mongoose = require('mongoose');

    const schemaDraft = new mongoose.Schema({

        email : String,
        name : String,
        password : String,
        phone_number : String,
        address : String,
        active : Boolean
    });
    return schemaDraft;
}

module.exports.schemaDraft = schema;