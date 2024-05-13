const { request, response } = require("express");
const createSMS = require("../helpers/createSMS");
const { sendMailCotizacion, sendMailEstimacion } = require("../helpers/createEmail");

 
const nuevoSMS = async (req = request, res = response) => {

    const body = req.body;

    // console.log(nom, courriel, telefono, sujec, message)

    try {

        createSMS(body).then((mensajeCreado) => {
            if (mensajeCreado) {
                // console.log(res)
                res.status(200).json({
                    ok: true,
                    message: "Mensaje enviado"
                })
            }
        })

    } catch (error) {
        res.status(200).json({
            ok: false,
            message: "Error al enviar mensaje"
        })
    }

} 

const nuevoEmailCotizacion = async (req = request, res = response) => {

    const body = req.body;

    // console.log(nom, courriel, telefono, sujec, message)

    try {

        sendMailCotizacion(body).then((emailEnviado) => {
            if (emailEnviado) {
                // console.log(res)
                res.status(200).json({
                    ok: true,
                    message: "correo enviado"
                })
            }
        })

    } catch (error) {
        res.status(200).json({
            ok: false,
            message: "Error al enviar correo"
        })
    }

}

const nuevoEmailEstimacion = async (req = request, res = response) => {

    const body = req.body;

    // console.log(nom, courriel, telefono, sujec, message)

    try {

        sendMailEstimacion(body).then((emailEnviado) => {
            if (emailEnviado) {
                // console.log(res)
                res.status(200).json({
                    ok: true,
                    message: "correo enviado"
                })
            }
        })

    } catch (error) {
        res.status(200).json({
            ok: false,
            message: "Error al enviar correo"
        })
    }

}

module.exports = {
    nuevoSMS,
    nuevoEmailCotizacion,
    nuevoEmailEstimacion
}