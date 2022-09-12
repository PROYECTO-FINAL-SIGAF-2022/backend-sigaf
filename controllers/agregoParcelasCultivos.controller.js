// ! Falta Completar el Post

import { AgregoParcelasCultivosModelo } from "../models/AgregoParcelasCultivos.model";

// Devuelve todos los datos de la colección
export const getAggParcelasCultivos = async (req, res) => {
  try {
    const Datos = await AgregoParcelasCultivosModelo.findAll(); // consulta para todos los documentos
    // Respuesta del servidor
    res.json(Datos);
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
    const Datos = await AgregoParcelasCultivosModelo.findByPk(id); // consulta para todos los documentos

    // Respuesta del servidor
    res.json(Datos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// TODO: Faltaria Agregar la id de parcela_cultivo
// TODO: No lo agregue xq creo que lo hace el archivo "Associations"
export const postAggParcelaCultivo = async (req, res) => {
  try {
    const { cantidad_agregada } = req.body;

    const nuevaAggParcelaCultivo = await AgregoParcelasCultivosModelo.create({
      cantidad_agregada,
    });

    res.json({
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
    const { cantidad_agregada } = req.body[0];

    console.log(id);

    const updateAggParcCult = await AgregoParcelasCultivosModelo.findOne({
      where: { id_agrego_parcela_cultivo: id },
    });
    updateAggParcCult.cantidad_agregada = cantidad_agregada;
    await updateAggParcCult.save();

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
