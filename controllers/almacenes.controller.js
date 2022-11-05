// import { logSistema } from "../helpers/createLog.js";

import { logSistema } from "../helpers/createLog.js";
import { AlmacenesModelo } from "../models/Almacenes.model.js";

export const getAlmacenes = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;
    const almacenes = await AlmacenesModelo.findAll({ raw: true, where: { id_establecimiento, activo: true } });

    if (almacenes.length === 0) {
      return res.status(400).json("No hay almacenes asociadas a este establecimiento");
    }
    return res.status(200).json(almacenes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAlmacenUnico = async (req, res) => {
  try {
    const { id } = req.params;

    const almacen = await AlmacenesModelo.findByPk(id);

    await logSistema(req.decoded, almacen.dataValues, "busqueda");

    if (!almacen) {
      return res.status(400).json("No hay una almacen asociada a este ID");
    }
    return res.status(200).json(almacen);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postAlmacenes = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;

    const {
      descripcion_almacen,
      tipo_adquisicion,
      precio_adquisicion,
    } = req.body;

    const nuevoAlmacen = await AlmacenesModelo.create({
      descripcion_almacen,
      tipo_adquisicion,
      precio_adquisicion,
      id_establecimiento,
    });

    await logSistema(req.decoded, nuevoAlmacen.dataValues, "creacion");

    res.status(201).json({
      msg: "La actividad se creo Correctamente",
      nuevoAlmacen,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const putAlmacen = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      descripcion_almacen,
      tipo_adquisicion,
      precio_adquisicion,
    } = req.body;
    const updateAlmacen = await AlmacenesModelo.findOne({
      where: { id_almacen: id },
    });

    updateAlmacen.descripcion_almacen = descripcion_almacen;
    updateAlmacen.tipo_adquisicion = tipo_adquisicion;
    updateAlmacen.precio_adquisicion = precio_adquisicion;
    await updateAlmacen.save();

    await logSistema(req.decoded, updateAlmacen.dataValues, "actualizacion");

    res.status(200).json({
      msg: "El almacen se actualizo Correctamente",
      updateAlmacen,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteAlmacen = async (req, res) => {
  try {
    const id_almacen = req.params.id;

    const delAlmacen = await AlmacenesModelo.findOne({
      where: { id_almacen },
    });

    delAlmacen.activo = false;
    await delAlmacen.save();

    await logSistema(req.decoded, delAlmacen.dataValues, "eliminacion");

    res.status(200).json({
      message: `Se elimino el almacen con el ID: ${id_almacen}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const putVenderAlmacen = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      precio_venta,
      fecha_venta,
    } = req.body;
    const venderAlmacen = await AlmacenesModelo.findOne({
      where: { id_almacen: id },
    });

    venderAlmacen.precio_venta = precio_venta;
    venderAlmacen.fecha_venta = fecha_venta;
    venderAlmacen.activo = "0";
    await venderAlmacen.save();

    await logSistema(req.decoded, venderAlmacen.dataValues, "actualizacion");

    res.status(200).json({
      msg: "El almacen se actualizo Correctamente",
      venderAlmacen,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
