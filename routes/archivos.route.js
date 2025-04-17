const path = require("path");

// Importar módulos y controladores
const express = require("express");
const multer = require('multer');
const fs = require('fs'); // 🔹 Agregar esta línea

const { uploadImageToGoDaddy, guardarRutaImagen, obtenerRutasImagen, eliminarRutaImagen } = require("../controllers/archivos.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = express.Router();

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = './uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo
  }
});

const upload = multer({ storage: storage });

// Ruta para subir imágenes
router.post("/upload", [
  validarJWT,
  validarCampos
], upload.single('image'), uploadImageToGoDaddy);

// Ruta para guardar nombre del archivo subido
router.post("/subir/nombre-archivo", [
  validarJWT,
  validarCampos
], guardarRutaImagen)

// Ruta para obtener archivos

router.get("/obtener/archivos", [], obtenerRutasImagen);

router.post("/eliminar/:id", [
  validarJWT,
  validarCampos
], eliminarRutaImagen);


module.exports = router;
