const { Schema, model } = require('mongoose');


const ArchivosAtencionSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
        enum: ['pago', 'imagen', 'video'], // Define los tipos válidos
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
    fechaActualizacion: {
        type: Date,
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

// Método para modificar la respuesta JSON del modelo
ArchivosAtencionSchema.methods.toJSON = function () {
    const { __v, _id, estado, ...archivo } = this.toObject();
    archivo.uid = _id;
    return archivo;
}

module.exports = model('Archivos', ArchivosAtencionSchema);
