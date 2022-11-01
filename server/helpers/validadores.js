const { Producto } = require("../models")


const existeProducto = async( id ) => {

   const producto = await Producto.findById( id );

   if( !producto || !producto?.estado ) throw new Error(`El producto con el id ${id} no existe`);

   return true;
   
}


module.exports = {
   existeProducto
}