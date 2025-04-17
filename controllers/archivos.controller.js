const ftp = require("basic-ftp");
const path = require('path');
const fs = require('fs');
const Archivos = require("../models/archivos.modelo");

const uploadImageToGoDaddy = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No se subió ningún archivo.');
        }

        const filePath = req.file.path;
        const fileName = path.basename(filePath);
        const remoteDir = "/imagenes"; // Directorio remoto donde deseas cargar la imagen

        const client = new ftp.Client();
        client.ftp.verbose = true; // Activa los logs para ver detalles de la conexión

        await client.access({
            host: process.env.GODADDY_HOST,
            user: process.env.GODADDY_USERNAME,
            password: process.env.GODADDY_PASSWORD,
            secure: false, // GoDaddy generalmente no usa FTP seguro (FTPS)
        });

        console.log("Conexión exitosa, verificando y subiendo archivo...");

        // Verifica si el directorio remoto existe
        try {
            await client.cd(remoteDir); // Intenta acceder al directorio
        } catch (err) {
            console.log(`El directorio ${remoteDir} no existe, creando...`);
            // Crear el directorio manualmente con MKD (comando FTP)
            await client.send(`MKD ${remoteDir}`);
            console.log(`Directorio ${remoteDir} creado con éxito.`);
        }

        // Sube el archivo
        await client.uploadFrom(filePath, `${remoteDir}/${fileName}`);

        res.status(200).json({
            ok: true,
            msg: `Archivo subido con éxito: ${fileName}`,
            fileName,
        });
        
    } catch (error) {
        console.error("Error en FTP:", error);
        res.status(500).json({
            ok: false,
            msg: "Error al subir el archivo a GoDaddy.",
            error: error.message,
        });
    }
};

const guardarRutaImagen = async (req, res) => {
    try {

        const data = req.body;

        // Guarda la ruta de la imagen en la base de datos
        const archivo = new Archivos(data);

        // Guardar en DB
        await archivo.save();


        res.status(200).json({
            ok: true,
            data: {
                archivo
            }
        });

    } catch (err) {
        console.error("Error al guardar la ruta de la imagen:", err);
        res.status(500).json({
            ok: false,
            msg: "Error al guardar la ruta de la imagen.",
            error: err.message,
        });
    }
}

const obtenerRutasImagen = async (req, res) => {

    try {

        const { limit = 0, desde = 0, rol } = req.query;
        let query = { estado: true };

        if (rol) {
            query.rol = rol;
        }

        const archivos = await Archivos.find(query)
            .skip(Number(desde))
            .limit(Number(limit));

        res.status(200).json({
            ok: true,
            data: {
                archivos
            }
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: "Error al obtener las rutas de las imágenes.",
            error: error.message,
        })

    }
}

const eliminarRutaImagen = async (req, res) => {

    try {
        
        const { id } = req.params;

        const archivo = await Archivos.findByIdAndUpdate(id, { estado: false }, { new: true });

        // Si el archivo existe y se eliminó correctamente
        if (archivo) {
            res.status(200).json({
                ok: true,
                msg: "Ruta de imagen eliminada correctamente.",
                archivo
            });
        }

    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: "Error al eliminar la ruta de imagen.",
            error: error.message,
        });

    }

}

module.exports = {
    uploadImageToGoDaddy,
    guardarRutaImagen,
    obtenerRutasImagen,
    eliminarRutaImagen
};
