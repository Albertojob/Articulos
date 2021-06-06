var express = require('express');
var router = express.Router();
const upload = require('../public/js/guardafoto.js');

var articulo =require('../controllers/articulocontroller.js');

router.get('/',articulo.list);
router.post('/show',articulo.show);

router.post('/crear',articulo.crear);
router.post('/editar',articulo.editar);

router.post('/salvar',upload.single('imagen_fichero'),articulo.salvar);

router.post('/eliminar',articulo.eliminar);
module.exports = router;

