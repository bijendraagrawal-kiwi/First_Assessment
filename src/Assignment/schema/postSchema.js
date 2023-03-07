const schema = () => {

    const mongoose = require('mongoose');

    const schemaDraft = new mongoose.Schema({

        user_Id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"
        },
        image : {

            data : Buffer,
            contentType : String
        },    
        title : String,
        description : String 
           
    });
    return schemaDraft;
}

module.exports.post = schema;