// import { logSistema } from "../helpers/createLog.js";

import { logSistema } from "../helpers/createLog.js";
import { MaquinasModelo } from "../models/Maquinas.model.js";

export const getMaquinas = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;
    const maquinas = await MaquinasModelo.findAll({ raw: true, where: { id_establecimiento, activo: true } });

    if (maquinas.length === 0) {
      return res.status(400).json("No hay maquinas asociadas a este establecimiento");
    }
    return res.status(200).json(maquinas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getMaquinaUnico = async (req, res) => {
  try {
    const { id } = req.params;

    const maquina = await MaquinasModelo.findByPk(id);

    await logSistema(req.decoded, maquina.dataValues, "busqueda");

    if (!maquina) {
      return res.status(400).json("No hay una maquina asociada a este ID");
    }
    return res.status(200).json(maquina);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postMaquina = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;

    const {
      descripcion_maquina,
      tipo_adquisicion_maquina,
      precio_adquisicion_maquina,
    } = req.body;

    const nuevaMaquina = await MaquinasModelo.create({
      descripcion_maquina,
      tipo_adquisicion_maquina,
      precio_adquisicion_maquina,
      id_establecimiento,
    });

    await logSistema(req.decoded, nuevaMaquina.dataValues, "creacion");

    res.status(201).json({
      msg: "La maquina se creo Correctamente",
      nuevaMaquina,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const putMaquina = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      descripcion_maquina,
      tipo_adquisicion_maquina,
      precio_adquisicion_maquina,
    } = req.body;
    const updateMaquina = await MaquinasModelo.findOne({
      where: { id_maquina: id },
    });

    updateMaquina.descripcion_maquina = descripcion_maquina;
    updateMaquina.tipo_adquisicion_maquina = tipo_adquisicion_maquina;
    updateMaquina.precio_adquisicion_maquina = precio_adquisicion_maquina;
    await updateMaquina.save();

    await logSistema(req.decoded, updateMaquina.dataValues, "actualizacion");

    res.status(200).json({
      msg: "La maquina se actualizo Correctamente",
      updateMaquina,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteMaquina = async (req, res) => {
  try {
    const id_maquina = req.params.id;

    const delMaquina = await MaquinasModelo.findOne({
      where: { id_maquina },
    });

    delMaquina.activo = false;
    await delMaquina.save();

    await logSistema(req.decoded, delMaquina.dataValues, "eliminacion");

    res.status(200).json({
      message: `Se elimino la maquina con el ID: ${id_maquina}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const putVenderMaquina = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      precio_venta_maquina,
      fecha_venta_maquina,
    } = req.body;
    const venderMaquina = await MaquinasModelo.findOne({
      where: { id_maquina: id },
    });

    venderMaquina.precio_venta_maquina = precio_venta_maquina;
    venderMaquina.fecha_venta_maquina = fecha_venta_maquina;
    venderMaquina.activo = "0";
    await venderMaquina.save();

    await logSistema(req.decoded, venderMaquina.dataValues, "actualizacion");

    res.status(200).json({
      msg: "La maquina se actualizo Correctamente",
      venderMaquina,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
