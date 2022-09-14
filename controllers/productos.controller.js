import { logSistema } from "../helpers/createLog.js";
import { ProductosModelo } from "../models/Productos.model.js";

// Devuelve todos los productos de la colección
export const getProductos = async (req, res) => {
  try {
    const productos = await ProductosModelo.findAll({where: { activo: true }}); // consulta para todos los documentos

    res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getProductoUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await ProductosModelo.findByPk(id); // consulta para todos los documentos


    await logSistema(req.decoded, producto.dataValues, "busqueda");

    // Respuesta del servidor
 
    res.status(200).json(producto);
   
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postPoducto = async (req, res) => {
  try {
    const {
      descripcion_producto,
      fecha_vencimiento_producto,
      cantidad_producto,
    } = req.body;

    const nuevoProducto = await ProductosModelo.create({
      descripcion_producto,
      fecha_vencimiento_producto,
      cantidad_producto,
    });

    
    await logSistema(req.decoded, nuevoProducto.dataValues, "creacion");

    res.status(201).json({
      msg: "El producto se creo Correctamente",
      nuevoProducto,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      descripcion_producto,
      fecha_vencimiento_producto,
      cantidad_producto,
    } = req.body;
    // console.log(id);

    const updateProduc = await ProductosModelo.findOne({
      where: { id_producto: id },
    });
    updateProduc.descripcion_producto = descripcion_producto;
    updateProduc.fecha_vencimiento_producto = fecha_vencimiento_producto;
    updateProduc.cantidad_producto = cantidad_producto;
    await updateProduc.save();

    await logSistema(req.decoded, updateProduc.dataValues, "actualizacion");

    res.status(201).json({
      msg: "El producto se actualizo Correctamente",
      updateProduc,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminarProducto = await ProductosModelo.findOne({ where: { id_producto: id } });

    eliminarProducto.activo = false;

    await eliminarProducto.save();

    await logSistema(req.decoded, eliminarProducto.dataValues, "eliminacion");

    res.status(201).json({
      msg: `El producto con id ${id} se elimino Correctamente`
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
