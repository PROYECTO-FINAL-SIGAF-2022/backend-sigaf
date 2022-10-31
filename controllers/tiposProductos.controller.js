import { logSistema } from "../helpers/createLog.js";
import { TiposProductosModelo } from "../models/TiposProductos.model.js";

export const getTiposProductos = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;
    const tiposProductos = await TiposProductosModelo.findAll({ where: { id_establecimiento, activo: true } });

    if (tiposProductos.length === 0) {
      return res.status(400).json("No hay tipos productos asociadas a este establecimiento");
    }
    return res.status(200).json(tiposProductos[0].dataValues);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getTipoProductoUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoProducto = await TiposProductosModelo.findByPk(id);

    await logSistema(req.decoded, tipoProducto.dataValues, "busqueda");

    if (!tipoProducto) {
      return res.status(400).json("No hay una tipo producto asociada a este ID");
    }
    return res.status(200).json(tipoProducto);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postTipoPoducto = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;

    const {
      descripcion_tipo_producto,
    } = req.body;

    const nuevotipoProducto = await TiposProductosModelo.create({
      descripcion_tipo_producto,
      id_establecimiento,
    });

    await logSistema(req.decoded, nuevotipoProducto.dataValues, "creacion");

    res.status(201).json({
      msg: "El tipo de producto se creo Correctamente",
      nuevo_tipoProducto: nuevotipoProducto,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTipoProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      descripcion_tipo_producto,
    } = req.body;
    // console.log(id);

    const updateTipoProd = await TiposProductosModelo.findOne({
      where: { id_tipo_producto: id },
    });
    updateTipoProd.descripcion_tipo_producto = descripcion_tipo_producto;
    await updateTipoProd.save();

    await logSistema(req.decoded, updateTipoProd.dataValues, "actualizacion");

    res.status(200).json({
      msg: "El tipo de producto se actualizo Correctamente",
      updateTipoProd,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteTipoProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminarTipoProdcuto = await TiposProductosModelo.findOne({ where: { id_tipo_producto: id } });

    eliminarTipoProdcuto.activo = false;

    await eliminarTipoProdcuto.save();

    await logSistema(req.decoded, eliminarTipoProdcuto.dataValues, "eliminacion");

    res.status(200).json({
      msg: `El tipo de procuto con id ${id} se elimino correctamente`,

    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
