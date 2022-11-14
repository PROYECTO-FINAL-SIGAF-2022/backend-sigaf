import { Op } from "sequelize";
import { logSistema } from "../helpers/createLog.js";
import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model.js";

export const getUnidadesMedidas = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;
    const unidadMedida = await UnidadesMedidasModelo.findAll({ raw: true, where: { id_establecimiento, activo: true, id_unidad_medida: { [Op.not]: "1" } } });
    if (unidadMedida.length === 0) {
      return res.status(400).json("No hay unidad medidas asociadas a este establecimiento");
    }
    return res.status(200).json(unidadMedida);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getUnidadMedidaUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const unidadMedida = await UnidadesMedidasModelo.findByPk(id);

    await logSistema(req.decoded, unidadMedida.dataValues, "busqueda");

    if (!unidadMedida) {
      return res.status(400).json("No hay una unidad medida asociada a este ID");
    }
    return res.status(200).json(unidadMedida);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postUnidadMedida = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;

    const { descripcion_unidad_medida } = req.body;

    const nuevaUnidadMedida = await UnidadesMedidasModelo.create({
      descripcion_unidad_medida,
      id_establecimiento,
    });

    await logSistema(req.decoded, nuevaUnidadMedida.dataValues, "creacion");

    res.json({
      msg: "La unidad de medida se creo correctamente",
      nuevaUnidadMedida,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUnidadMedida = async (req, res) => {
  try {
    const { id } = req.params;

    const { descripcion_unidad_medida } = req.body;

    const actualizarUnidadMedida = await UnidadesMedidasModelo.findOne({
      where: { id_unidad_medida: id },
    });

    actualizarUnidadMedida.descripcion_unidad_medida = descripcion_unidad_medida;

    await actualizarUnidadMedida.save();

    await logSistema(req.decoded, actualizarUnidadMedida.dataValues, "actualizaion");

    res.status(200).json(actualizarUnidadMedida);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUnidadMedida = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminarUnidadMedida = await UnidadesMedidasModelo.findOne({
      where: { id_unidad_medida: id },
    });

    eliminarUnidadMedida.activo = false;

    await eliminarUnidadMedida.save();

    await logSistema(req.decoded, eliminarUnidadMedida.dataValues, "eliminacion");

    res.status(200).json({
      message: `La unidad de medida con id ${id} se elimino correctamente`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
