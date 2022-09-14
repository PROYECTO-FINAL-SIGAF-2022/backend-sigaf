import { logSistema } from "../helpers/createLog.js";
import { PerdidasParcelasCultivosModelo } from "../models/PerdidasParcelasCultivos.model.js";

//TODO: falta agregar el activo en el modelo y controlador
export const getPerdidasParcelasCultivos = async (req, res) => {
  try {
    const perdidaParCult = await PerdidasParcelasCultivosModelo.findAll(); // consulta para todos los documentos
    // Respuesta del servidor
    res.json(perdidaParCult);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getPerdidaParcelaCultivoUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const perdidaParCult = await PerdidasParcelasCultivosModelo.findByPk(id);

    await logSistema(req.decoded, perdidaParCult.dataValues, "busqueda");

    res.json(perdidaParCult);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postPerdidaParcelaCultivo = async (req, res) => {
  try {
    const { id_parcela_cultivo,cantidad_perdida } = req.body;

    const nuevaPerdidaParcelaCultivo = await PerdidasParcelasCultivosModelo.create({
        id_parcela_cultivo,
        cantidad_perdida,
    });

    await logSistema(req.decoded, nuevaPerdidaParcelaCultivo.dataValues, "creacion");

    res.json({
      msg: "La perdida parcela-cultivo se creo correctamente",
      nuevaPerdidaParcelaCultivo,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updatePerdidaParcelaCultivo = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_parcela_cultivo,
      cantidad_perdida,
    } = req.body;
    // console.log(id);

    const updatePerdidaPC = await PerdidasParcelasCultivosModelo.findOne({
      where: { id_perdida_parcela_cultivo: id },
    });
    updatePerdidaPC.id_parcela_cultivo = id_parcela_cultivo;
    updatePerdidaPC.cantidad_perdida = cantidad_perdida;
    await updatePerdidaPC.save();

    await logSistema(req.decoded, updatePerdidaPC.dataValues, "actualizacion");

    res.status(201).json({
      msg: "La perdida se actualizo Correctamente",
      updatePerdidaPC,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deletePerdidaParcelaCultivo = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminarPerdida = await PerdidasParcelasCultivosModelo.findOne({
      where: { id_perdida_parcela_cultivo: id },
    });

    eliminarPerdida.activo = false;

    await eliminarPerdida.save();

    await logSistema(req.decoded, eliminarPerdida.dataValues, "eliminacion");

    res.status(200).json({
      message: `La Perdida Parcela-Cultivo con id ${id} se elimino correctamente`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
