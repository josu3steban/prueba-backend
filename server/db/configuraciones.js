const mongoose = require('mongoose');

const dbConnection = async() => {

   try {

      await mongoose.connect( process.env.MONGODB_CNN, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false,
         useCreateIndex: true
         
      });
      console.log('DB conectada');

   }catch( error ) {

      throw new Error('Erro al conectar a la base de datos');
      
   }

};

module.exports = {
   dbConnection
}