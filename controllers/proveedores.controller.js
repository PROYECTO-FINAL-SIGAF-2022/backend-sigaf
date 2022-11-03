import { logSistema } from "../helpers/createLog.js";
import { ProveedoresModelo } from "../models/Proveedores.model.js";

export const getProveedores = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;
    const proveedores = await ProveedoresModelo.findAll({ raw: true, where: { id_establecimiento, activo: true } });

    if (proveedores.length === 0) {
      return res.status(400).json("No hay proveedores asociadas a este establecimiento");
    }
    return res.status(200).json(proveedores);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getProveedorUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const proveedor = await ProveedoresModelo.findByPk(id);

    await logSistema(req.decoded, proveedor.dataValues, "busqueda");

    if (!proveedor) {
      return res.status(400).json("No hay una proveedor asociada a este ID");
    }
    return res.status(200).json(proveedor);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postProveedor = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;
    const {
      nombre_proveedor,
      telefono_proveedor,
      direccion_proveedor,
    } = req.body;

    const nuevoProveedor = await ProveedoresModelo.create({
      nombre_proveedor,
      telefono_proveedor,
      direccion_proveedor,
      id_establecimiento,
    });

    await logSistema(req.decoded, nuevoProveedor.dataValues, "creacion");

    res.status(201).json({
      msg: "El proveedor se creo Correctamente",
      nuevo_proveedor: nuevoProveedor,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre_proveedor,
      telefono_proveedor,
      direccion_proveedor,
    } = req.body;
    // console.log(id);

    const updateProvee = await ProveedoresModelo.findOne({
      where: { id_proveedor: id },
    });
    updateProvee.nombre_proveedor = nombre_proveedor;
    updateProvee.telefono_proveedor = telefono_proveedor;
    updateProvee.direccion_proveedor = direccion_proveedor;
    await updateProvee.save();

    await logSistema(req.decoded, updateProvee.dataValues, "actualizacion");

    res.status(200).json({
      msg: "El proveedor se actualizo Correctamente",
      updateProvee,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProveedor = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminarProveedor = await ProveedoresModelo.findOne({ where: { id_proveedor: id } });

    eliminarProveedor.activo = false;

    await eliminarProveedor.save();

    await logSistema(req.decoded, eliminarProveedor.dataValues, "eliminacion");

    res.status(200).json({
      message: `El proveedor con id ${id} fue eliminado`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
