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
    Articulo.findOne({codigo : [req.body.dato]}).exec(function(err,articulo){
        if(err) {console.log('Error al listar Articulos:',err);return;}
        res.render('../views/formulario',{articulo:articulo,familias :familias});
    });
};

articulosController.crear = function(req,res) {
    if (req.session.datos){
        res.render('../views/formulario',{articulos:req.session.datos.articulos, errores :req.session.datos.errores});
        req.session.destroy();
    }else{
        let opcion = req.header('Referer').substr(req.header('Referer').indexOf('//')+2);
        opcion= opcion.substr(opcion.indexOf('/')+1);
        Articulo.findOne({}).sort({codigo :-1}).exec(async function(err,articulo){
            articulo.codigo++;
            articulo.descripcion = '';
            articulo.familia = '';
            articulo.impuesto = '';
            articulo.precio = '';
            articulo.stock = '';
            articulo.dato = req.body.dato;
            let familias = await Articulo.distinct('familia').exec();
            if(err) {console.log('Error al buscar articulos',err);return;}
            res.render('../views/formulario',{articulo:articulo,original :opcion,familias :familias});
        });
    }
};

articulosController.salvar = function(req,res) {
    var articulo = new Articulo(req.body);
    let opcion = req.header('Referer').substr(req.header('Referer').lastIndexOf('/')+1);
    console.log("por aqui paso",opcion);
    switch (opcion){

        case "crear": {
            articulo._id = mongoose.Types.ObjectId();
            articulo.save(function(err){
            if(err) {
                console.log("Error recibido:",err.errors);
                let listaerrores = '';
                for (var clave in err.errors) {
                    listaerrores += (clave,'---',err.errors[clave].properties.message)
                }
                req.session.datos = {articulos:articulo,errores :listaerrores};
                res.redirect(307,'/crear');
            } else {
                
                if (req.body.codArticulo == undefined) {
                    res.redirect('/');
                }   
            }
        });
        break;
        }


        case "editar": {
            console.log("Articulo vale:",articulo);
            Articulo.findByIdAndUpdate(req.body._id,{$set: {
                codigo : req.body.codigo,
                descripcion: req.body.descripcion,
                familia: req.body.familia,
                impuesto: req.body.impuesto,
                precio: req.body.precio,
                stock: req.body.stock,
            }},{new:false,runValidators:true},
            function(err,familia){
                if(err) {console.log('Error al editar Articulo',err);return;}
                
                if (req.body.codArticulo == undefined) {
                    res.redirect('/');
                };
            })
            break;
        }
    }
};

articulosController.editar = async function(req,res) {
    let familias = await Articulo.distinct('familia').exec();
    let opcion = req.header('Referer').substring(req.header('Referer').indexOf("//")+2);
    opcion = opcion.substring(opcion.indexOf('/')+1);
    Articulo.findOne({_id : [req.body.dato]}).exec(function(err,articulo){
        if(err) {console.log('Error al buscar Articulo',err);return;}
        res.render('../views/formulario',{articulo:articulo,original :opcion,familias :familias});
    });
};

articulosController.eliminar = function(req,res) {
    Articulo.deleteOne({_id: [req.body.dato]}).exec(function(err) {
        if (err) {console.log('Error: ',err);return;}
        res.redirect("/listar");
    });
}


module.exports = articulosController;