var express = require('express');
var router = express.Router();

var articulo =require('../controllers/articulocontroller.js');

router.get('/',articulo.list);
router.post('/show',articulo.show);

module.exports = router;

