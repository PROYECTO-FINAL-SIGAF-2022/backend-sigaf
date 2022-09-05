import { ProveedoresModelo } from "../models/Proveedores.model.js";

// Devuelve todos los proveedores de la colección
export const getProveedores = async (req, res) => {
  try {
    const proveedores = await ProveedoresModelo.findAll({where: { activo: true }}); // consulta para todos los documentos

    res.status(200).json(proveedores);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getProveedorUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const proveedor = await ProveedoresModelo.findByPk(id); // consulta para todos los documentos

    // Respuesta del servidor
    if (proveedor) {
      res.json(proveedor);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postProveedor = async (req, res) => {
  try {
    const {
      nombre_proveedor,
      telefono_proveedor,
      direccion_proveedor,
    } = req.body;

    const nuevoProveedor = await ProveedoresModelo.create({
      nombre_proveedor,
      telefono_proveedor,
      direccion_proveedor,
    });

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

    res.status(201).json({
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

    const eliminarProveedor = await ProveedoresModelo.finOne({ where: { id_proveedor: id } });

    eliminarProveedor.activo = false;

    await eliminarProveedor.save();

    res.status(200).json({
      message: `El proveedor con id ${id} fue eliminado`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
