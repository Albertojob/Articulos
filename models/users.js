var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usersSchema = new Schema({
    _id: {type:Number},
    username :{type:String},
    password: {type: String},
    firstName: {type: String},
    lastName: {type: String}
})

module.exports = mongoose.model('usuarios',usersSchema);