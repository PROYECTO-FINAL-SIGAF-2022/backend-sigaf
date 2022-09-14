// ! Falta Completar el Post

import { AgregoParcelasCultivosModelo } from "../models/AgregoParcelasCultivos.model.js";
import { logSistema } from "../helpers/createLog";

// Devuelve todos los datos de la colección
export const getAggParcelasCultivos = async (req, res) => {
  try {
    const agregoParCul = await AgregoParcelasCultivosModelo.findAll({ where: { activo: true } }); // consulta para todos los documentos
    // Respuesta del servidor
    res.json(agregoParCul);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAggParcelaCultivoUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const agregoParCul = await AgregoParcelasCultivosModelo.findByPk(id); // consulta para todos los documentos

    await logSistema(req.decoded, agregoParCul.dataValues, "busqueda");

    // Respuesta del servidor
    res.json(agregoParCul);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postAggParcelaCultivo = async (req, res) => {
  try {
    const { id_parcela_cultivo, id_unidad_medida, cantidad_agregada } = req.body;

    const nuevaAggParcelaCultivo = await AgregoParcelasCultivosModelo.create({
      id_parcela_cultivo,
      id_unidad_medida,
      cantidad_agregada,
    });

    await logSistema(req.decoded, nuevaAggParcelaCultivo.dataValues, "creacion");

    res.status(200).json({
      msg: "La ParcelaCultivo se creo Correctamente",
      nuevaAggParcelaCultivo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateAggParcCultela = async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad_agregada, id_parcela_cultivo, id_unidad_medida } = req.body;

    console.log(id);

    const updateAggParcCult = await AgregoParcelasCultivosModelo.findOne({
      where: { id_agrego_parcela_cultivo: id },
    });
    updateAggParcCult.id_parcela_cultivo = id_parcela_cultivo;
    updateAggParcCult.id_unidad_medida = id_unidad_medida;
    updateAggParcCult.cantidad_agregada = cantidad_agregada;
    await updateAggParcCult.save();

    await logSistema(req.decoded, updateAggParcCult.dataValues, "actualizacion");

    res.json({
      msg: "La ParcelaCultivo se actualizo Correctamente",
      updateAggParcCult,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteAggParcelaCultivo = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminarAgregoParcCultivo = await AgregoParcelasCultivosModelo.findOne(
      { where: { id_agrego_parcela_cultivo: id } },

    );

    eliminarAgregoParcCultivo.activo = false;

    await eliminarAgregoParcCultivo.save();

    await logSistema(req.decoded, eliminarAgregoParcCultivo.dataValues, "eliminacion");

    res.status(200).json({
      message: `La Parcela Cultivo ${id} se elimino correctamente`,

    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
