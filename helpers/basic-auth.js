const userService = require('../users/user.service');

module.exports = basicAuth;

async function basicAuth(req, res, next) {
    // make authenticate path public
    console.log("Comprobando camino");
    if (req.path === '/users/authenticate') {
        return next();
    }
    console.log("Comprobando autorizacion basica");
    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === false) {
        return res.status(401).json({ message: ' No se encuentra Cabecera' });
    }
    console.log("Verificado usuario y contraseña");

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    console.log("Datos:",username,password);
    const user = await userService.authenticate({ username, password });
    if (!user) {
        return res.status(401).json({ message: 'Credenciales invalidas' });
    }
    // attach user to request object
    req.user = user

    next();
}