const { Router } = require("express");
const { check } = require("express-validator");
const { nuevoSMS, nuevoEmailEstimacion, nuevoEmailCotizacion } = require("../controllers/mensaje.controller");

const router = Router();

//para enviar mensajes
router.post("/sms", nuevoSMS);

//para enviar correos
router.post("/email/cotizacion", nuevoEmailCotizacion);

//para enviar correos
router.post("/email/estimacion", nuevoEmailEstimacion);

module.exports = router;