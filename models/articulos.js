var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articulosSchema = new Schema({
    _id: {type:mongoose.ObjectId},
    codigo: {type:Number,required:true},
    descripcion :{type:String,max:50},
    familia: {type: String},
    impuesto: {type: Number},
    stock: {type: Number},
    precio: {type: Number}
})

module.exports = mongoose.model('Articulos',articulosSchema);