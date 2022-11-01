const { Schema, model } = require('mongoose');


const ProductoSchema = new Schema({

   nombre: {
      type     : String, 
      trim     : true, 
      required : true
   },

   descripcion: {
      type: String,
   },

   creado: {
      type     : Date,
      default  : Date.now()
   },

   stock: {
      type: Number,
      default: 1
   },

   precio: {
      type: Number,
      default: 0.00
   },

   estado: {
      type: Boolean,
      default: true
   }
   
}, { timestamps: true });

ProductoSchema.method.toJSON = function () {
   const { __v, ...rest } =  this.toObject();
   return rest;
}

module.exports = model( 'Producto', ProductoSchema );