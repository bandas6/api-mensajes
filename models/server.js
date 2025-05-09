const express = require('express');
const cors = require('cors');

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            mensajes: '/api/mensajes',
            archivos: '/api/archivos'
        }

        this.middlewares();


        this.routes();

    }

    middlewares(){

         // CORS 
        this.app.use(cors());

        // lectura y parceo de el body
        this.app.use(express.json());

         // Direcctorio publico
         this.app.use(express.static('public'));

    }


    routes(){
        this.app.use(this.paths.mensajes, require('../routes/mensajes.route'));
        this.app.use(this.paths.archivos, require('../routes/archivos.route'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }

}

module.exports = Server;