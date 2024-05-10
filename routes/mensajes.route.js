const { Router } = require("express");
const { check } = require("express-validator");
const { nuevoSMS, nuevoEmail } = require("../controllers/mensaje.controller");

const router = Router();

//para enviar mensajes
router.post("/sms", nuevoSMS);

//para enviar correos
router.post("/email", nuevoEmail);

module.exports = router;