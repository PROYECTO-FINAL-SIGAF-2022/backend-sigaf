import { logSistema } from "../helpers/createLog.js";
import { ProductosModelo } from "../models/Productos.model.js";

export const getProductos = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;

    const productos = await ProductosModelo.findAll({ raw: true, where: { id_establecimiento, activo: true } });

    if (productos.length === 0) {
      return res.status(400).json("No hay productos asociadas a este establecimiento");
    }
    return res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getProductoUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await ProductosModelo.findByPk(id);

    await logSistema(req.decoded, producto.dataValues, "busqueda");

    if (!producto) {
      return res.status(400).json("No hay un producto asociad a este ID");
    }
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postProducto = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;
    const { id_usuario } = req.decoded.paramUsuario;
    const {
      descripcion_producto,
      fecha_vencimiento_producto,
      cantidad_producto,
      precio_total_producto,
      id_proveedor,
      id_tipo_producto,
      id_unidad_medida,
      id_almacen,
    } = req.body;

    const nuevoProducto = await ProductosModelo.create({
      descripcion_producto,
      fecha_vencimiento_producto,
      cantidad_producto,
      precio_total_producto,
      id_proveedor,
      id_tipo_producto,
      id_usuario,
      id_unidad_medida,
      id_establecimiento,
      id_almacen,
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
    const { id_usuario } = req.decoded.paramUsuario;
    const {
      descripcion_producto,
      fecha_vencimiento_producto,
      cantidad_producto,
      precio_total_producto,
      id_proveedor,
      id_tipo_producto,
      id_unidad_medida,
      id_almacen,
    } = req.body;
    // console.log(id);

    const updateProduc = await ProductosModelo.findOne({
      where: { id_producto: id },
    });
    updateProduc.descripcion_producto = descripcion_producto;
    updateProduc.fecha_vencimiento_producto = fecha_vencimiento_producto;
    updateProduc.cantidad_producto = cantidad_producto;
    updateProduc.precio_total_producto = precio_total_producto;
    updateProduc.id_proveedor = id_proveedor;
    updateProduc.id_tipo_producto = id_tipo_producto;
    updateProduc.id_usuario = id_usuario;
    updateProduc.id_unidad_medida = id_unidad_medida;
    updateProduc.id_almacen = id_almacen;
    await updateProduc.save();

    await logSistema(req.decoded, updateProduc.dataValues, "actualizacion");

    res.status(200).json({
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

    res.status(200).json({
      msg: `El producto con id ${id} se elimino Correctamente`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
