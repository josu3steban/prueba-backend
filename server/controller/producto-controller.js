const { response } = require("express")

const { Producto } = require('../models');

const httpError = ( res ) => {
   return res.status(500).json({
      ok: false,
      error: {
         msg: 'Ocurrió un error inesperado'
      }
   });
}

const getProductos = async( req, res = response ) => {

   try{

      const prodcutos = await Producto.find({ estado: true });

      res.json({
         ok: true,
         prodcutos
      });

   }catch( error ) {
      console.log(error);
      httpError( res );
   }
   
}

const getProductoPorId = async( req, res = response ) => {

   const { id } = req.params;

   console.log(id);

   try {

      const producto = await Producto.findById( id );

      res.json({
         ok: true,
         producto
      });

   }catch( error ) {
      console.log(error);
      httpError(res);
   }

}

const createProducto = async( req, res = response ) => {

   const { nombre, descripcion, stock, precio } = req.body;

   try {

      const newProducto = new Producto({ nombre, descripcion, stock, precio });

      await newProducto.save();

      return res.json({
         ok       : true,
         msg      : 'Producto creado',
         producto : newProducto
      });
      
   }catch( error ) {

      console.log(error);
      httpError( res );

   }

}

const updateProducto = async( req, res = response ) => {

   const { id } = req.params;
   const { nombre, descripcion, stock, precio } = req.body;
   

   try {

      const producto = await Producto.findById( id );

      const data = {
         nombre      : nombre      ?? producto.nombre,
         descripcion : descripcion ?? producto.descripcion,
         stock       : stock       ?? producto.stock,
         precio      : precio      ?? producto.precio
      };

      const productoActualizado = await Producto.findByIdAndUpdate( id, data, { new: true });

      res.json({
         ok: true,
         msg: 'Producto actualizado',
         producto: productoActualizado
      });
      
   }catch( error ) {
      console.log(error);
      httpError(res);
   }

}

const deleteProducto = async( req, res = response ) => {
   
   const { id } = req.params;

   try {

      const producto = await Producto.findByIdAndDelete( id );

      res.json({
         ok: true,
         msg: 'Producto eliminado',
         producto
      });

   }catch( error ) {

      console.log(error);
      httpError( res );
      
   }

}


module.exports = {
   getProductos,
   getProductoPorId,
   createProducto,
   updateProducto,
   deleteProducto
}