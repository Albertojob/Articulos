var mongoose = require('mongoose');
var Articulo = require('../models/articulos');

var articulosController = {};

articulosController.list = function(req,res) {
    Articulo.find({}).exec(function(err,articulos){
        if(err) {console.log('Error al listar Articulos:',err);return;}
        res.render('../views/index',{articulos:articulos});
    });
};

articulosController.show = async function(req,res) {
   
    let familias = await Articulo.distinct('familia').exec();
    console.log(familias);
    Articulo.findOne({codigo : [req.body.dato]}).exec(function(err,articulo){
        if(err) {console.log('Error al listar Articulos:',err);return;}
        res.render('../views/formulario',{articulo:articulo,familias :familias});
    });
};

module.exports = articulosController;