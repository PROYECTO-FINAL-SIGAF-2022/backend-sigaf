import { ParcelasCultivosModelo } from "../models/ParcelasCultivos.model.js";

// Devuelve todos los Cultivos de la colección
export const getParcelasCultivos = async (req, res) => {
  try {
    const datosParcCultivo = await ParcelasCultivosModelo.findAll({where: { activo: true }}); // consulta para todos los documentos
    // Respuesta del servidor
    res.json(datosParcCultivo);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getParcelaCultivoUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const datosParcCultivo = await ParcelasCultivosModelo.findByPk(id); // consulta para todos los documentos


    await logSistema(req.decoded, datosParcCultivo.dataValues, "busqueda");

    // Respuesta del servidor
    res.json(datosParcCultivo);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postParcelaCultivo = async (req, res) => {
  try {
    const {
      id_parcela, id_cultivo, id_campania, cantidad_sembrada,
    } = req.body;

    const nuevoParcelaCultivo = await ParcelasCultivosModelo.create({
      id_parcela,
      id_cultivo,
      id_campania,
      cantidad_sembrada,
    });

    await logSistema(req.decoded, nuevoParcelaCultivo.dataValues, "creacion");

    res.json({
      msg: "La Parcela_Cultivo se creo Correctamente",
      nuevoParcelaCultivo,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateParcelaCultivo = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_parcela, id_cultivo, id_campania, cantidad_sembrada,
    } = req.body[0];

    console.log(id);

    const updateParcCult = await ParcelasCultivosModelo.findOne({
      where: { id_parcela_cultivo: id },
    });
    updateParcCult.id_parcela = id_parcela;
    updateParcCult.id_cultivo = id_cultivo;
    updateParcCult.id_campania = id_campania;
    updateParcCult.cantidad_sembrada = cantidad_sembrada;
    await updateParcCult.save();

    await logSistema(req.decoded, updateParcCult.dataValues, "actualizacion");

    res.json({
      msg: "La Parcela_Cultivo se actualizo Correctamente",
      updateParcCult,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteParcelaCultivo = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminarParcelaCultivo = await ParcelasCultivosModelo.findOne(
      { where: { id_parcela_cultivo: id } },

    );

    eliminarParcelaCultivo.activo = false;

    await eliminarParcelaCultivo.save();

    await logSistema(req.decoded, eliminarParcelaCultivo.dataValues, "eliminacion");

    res.status(200).json({
      message: `La Parcela_Cultivo con id ${id} fue eliminado`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
