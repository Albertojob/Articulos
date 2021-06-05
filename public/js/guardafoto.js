const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        // cb(null,'./public/familias')
        cb(null,`${req.body.destino}`)
    },
    filename: function (req,file,cb) {
        cb(null,`${req.body.codigo}.jpg`)
    }
    /*,
    fileFilter: (req,file,cb) => {
        const filetypes = /jpg/; // /jpeg|jpg|png|gif/
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname){
            return cb(null, true);
        }
        cb("Error: archivo no soportado");
    } */
})


const upload = multer({storage:storage});

module.exports = upload;