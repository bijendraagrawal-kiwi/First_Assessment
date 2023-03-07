const connection = () => {

    const mongoose = require('mongoose')
    mongoose.set('strictQuery', true)
    mongoose.connect('mongodb+srv://new_user:new_user@cluster0.97huk89.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true},(err,client) => {
    if(err){
        return console.log("Unable to connect the database", err);
    }
    else
    {

        console.log("Connect correctly");
    }
    
})
}
module.exports.con = connection;