const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const  db  = require('../database/conexion');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            automoviles:'/api/automoviles',
            servicios:  '/api/servicios',
            categorias: '/api/categorias',
            usuarios:   '/api/usuarios',
            uploads:    '/api/uploads',
            setcategory: '/api/setcategory',
            subcategory: '/api/subcategory',
            mantenimiento: '/api/mantenimiento',
        }


        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        try {
            await db.authenticate();
            console.log("database online");
          } catch (error) {
            throw new Error(error);
          }
    }


    middlewares() {

        // CORS
        this.app.use( cors() );
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header(
              "Access-Control-Allow-Headers",
              "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
            );
            res.header(
              "Access-Control-Allow-Methods",
              "GET, POST, OPTIONS, PUT, DELETE"
            );
            res.header("Content-Type: multipart/form-data;charset=UTF-8;");
            res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
            next();
          });
        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

        // Fileupload - Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.buscar, require('../routes/buscar'));
        this.app.use( this.paths.categorias, require('../routes/categorias'));
        this.app.use( this.paths.servicios, require('../routes/servicios'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        this.app.use( this.paths.uploads, require('../routes/uploads'));
        this.app.use( this.paths.automoviles, require('../routes/automovil'));
        this.app.use( this.paths.setcategory,require('../routes/setcategory'));
        this.app.use( this.paths.subcategory, require('../routes/subcategory'));
        this.app.use( this.paths.mantenimiento,require('../routes/mantenimiento'))
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
