import { logSistema } from "../helpers/createLog.js";
import { ParcelasModelo } from "../models/Parcelas.model.js";

// Devuelve todos los Parcelas de la colección
export const getParcelas = async (req, res) => {
  try {
    const parcelas = await ParcelasModelo.findAll({ where: { activo: true } }); // consulta para todos los documentos
    // Respuesta del servidor
    res.status(200).json(parcelas);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getParcelaUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const parcela = await ParcelasModelo.findByPk(id); // consulta para todos los documentos


    await logSistema(req.decoded, parcela.dataValues, "busqueda");

    // Respuesta del servidor
    res.status(200).json(parcela);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postParcela = async (req, res) => {
  try {
    const { georeferencia, superficie, id_establecimiento } = req.body;

    const nuevaParcela = await ParcelasModelo.create({
      georeferencia,
      superficie,
      id_establecimiento,
    });

    await logSistema(req.decoded, nuevaParcela.dataValues, "creacion");

    res.status(201).json({
      msg: "La Parcela se creo Correctamente",
      nuevaParcela,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateParcela = async (req, res) => {
  try {
    const { id } = req.params;
    const { georeferencia, superficie, id_establecimiento } = req.body;

    // console.log(id);

    const updateParc = await ParcelasModelo.findOne({
      where: { id_parcela: id },
    });
    updateParc.georeferencia = georeferencia;
    updateParc.superficie = superficie;
    updateParc.id_establecimiento = id_establecimiento;
    await updateParc.save();

    await logSistema(req.decoded, updateParc.dataValues, "actualizacion");

    res.status(200).json({
      msg: "La Parcela se actualizo Correctamente",
      updateParc,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteParcela = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminarParcela = await ParcelasModelo.findOne(
      { where: { id_parcela: id } },

    );

    eliminarParcela.activo = false;
    await eliminarParcela.save();

    await logSistema(req.decoded, eliminarParcela.dataValues, "eliminacion");

    res.status(200).json({
      message: `La Parcela ${id} se elimino correctamente`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
