const { Schema, model } = require('mongoose');

const DireccionSchema = new Schema({
    calle: {
        type: String,
    },
    ciudad: {
        type: String,
    },
    estado: {
        type: String,
    },
    codigoPostal: {
        type: String,
    },
    pais: {
        type: String,
    }
}, { _id: false });  // No creamos un ID propio para cada dirección


const DatosBancariosSchema = new Schema({
    banco: {
        type: String,
    },
    secretClient: {
        type: String,
    },
    clientId: {
        type: String,
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
    fechaActualizacion: {
        type: Date,
    }
}, { _id: false })

const DatosExternosSchema = new Schema({
    nombre: {
        type: String,
    },
    url: {
        type: String,
    },
    apiKey: {
        type: String,
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
    fechaActualizacion: {
        type: Date,
    }
}, { _id: false })

const UsuarioSchema = new Schema({
    nombres: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    nombreUsuario: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    direcciones: {
        type: [DireccionSchema],
    },
    datosExternos: {
        type: [DatosExternosSchema],
    },
    empresa: {
        type: Schema.Types.ObjectId,
        ref: 'Empresas',
    },  
    configuracion: {
        type: Schema.Types.ObjectId,
        ref: 'Configuracion',
    },
    bancarios: {
        type: [DatosBancariosSchema]
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
    fechaActualizacion: {
        type: Date,
    },
    rol: {
        type: String,
        default: 'USER_ROL',
    },
    estado: {
        type: Boolean,
        default: false,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

// Método para modificar la respuesta JSON del modelo
UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, estado, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('Usuario', UsuarioSchema);
