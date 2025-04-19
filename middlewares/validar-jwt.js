const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios.modelo');

const validarJWT = async (req = request, res = response, next) => {
    // Obtener el token desde el encabezado Authorization
    const { authorization } = req.headers;
    console.log(authorization)

    // Verificar que el encabezado Authorization existe y tiene el formato correcto
    /* if (!authHeader || !authHeader.startsWith('Bearer ')) {
         console.log(authHeader);
         
         return res.status(401).json({ error: 'No has iniciado sesión o formato de token incorrecto' });
     }   */

    // Extraer el token del encabezado Authorization
    let token;
    if (authorization) {
        token = authorization.replace(/"/g, '');
    }

    //console.log( 'token', token);
    try {
        // Verificar y decodificar el token
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        console.log('uid: ', uid);

        // Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        // Si el usuario no existe
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no encontrado en la base de datos',
                ok: false
            });
        }

        // Verificar si el estado del usuario es true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado eliminado',
                ok: false
            });
        }

        // Adjuntar el usuario autenticado a la solicitud
        req.usuarioAuth = usuario;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token inválido',
            ok: false
        });
    }
};

module.exports = {
    validarJWT
};
