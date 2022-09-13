import { TiposProductosModelo } from "../models/TiposProductos.model.js";

// Devuelve todos los tipos de productos de la colección
export const getTiposProductos = async (req, res) => {
  try {
    const tiposProductos = await TiposProductosModelo.findAll({where: { activo: true }}); // consulta para todos los documentos

    res.status(200).json(tiposProductos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getTipoProductoUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoProducto = await TiposProductosModelo.findByPk(id); // consulta para todos los documentos

    // Respuesta del servidor
    if (tipoProducto) {
      res.json(tipoProducto);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postTipoPoducto = async (req, res) => {
  try {
    const {
      descripcion_tipo_producto,
    } = req.body;

    const nuevotipoProducto = await TiposProductosModelo.create({
      descripcion_tipo_producto,
    });

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

    res.status(200).json({
      msg: `El tipo de procuto con id ${id} se elimino correctamente`,

    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
