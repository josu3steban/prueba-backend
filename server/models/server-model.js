const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../db/configuraciones');

class Server {

   constructor() {
      
      this.app = express();
      this.port = process.env.PORT;

      // iniciar conexion a la base de datos
      this.dbConnection();

      this.middlewares();

      // rutas principales
      this.rutasProductos = '/api/producto';

      // rutas principales
      this.routes();


   }

   async dbConnection() {
      await dbConnection();
   }

   routes() {
      this.app.use( this.rutasProductos, require('../routes/producto-rutas') );
   }

   middlewares() {
      this.app.use( cors() );
      this.app.use( express.json() );
      this.app.use( express.static('public') );
   }

   listen() {
      this.app.listen( this.port, () => {
         console.log(`Corriendo en el puerto ${this.port}`)
      });
   }
   
}

module.exports = Server;