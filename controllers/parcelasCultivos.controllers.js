import { logSistema } from "../helpers/createLog.js";
import { CultivosModelo } from "../models/Cultivos.model.js";
import { ParcelasCultivosModelo } from "../models/ParcelasCultivos.model.js";
import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model.js";

export const getParcelasCultivos = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;

    const datosParcCultivo = await ParcelasCultivosModelo.findAll({ raw: true, where: { id_establecimiento, activo: true } });

    if (datosParcCultivo.length === 0) {
      return res.status(400).json("No hay parcelas cultivos asociados a este establecimiento");
    }
    return res.status(200).json(datosParcCultivo);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getParcelaCultivoUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const datosParcCultivo = await ParcelasCultivosModelo.findByPk(id);

    await logSistema(req.decoded, datosParcCultivo.dataValues, "busqueda");

    if (!datosParcCultivo) {
      return res.status(400).json("No hay una datos parcela cultivo asociada a este ID");
    }
    return res.status(200).json(datosParcCultivo);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getParcelaCultivoByParcela = async (req, res) => {
  try {
    const { idCampania, idParcela } = req.params;
    const { id_establecimiento } = req.decoded.paramUsuario;

    const datosParcCultivo = await ParcelasCultivosModelo.findAll({
      raw: true,
      nest: true,
      where: { id_parcela: idParcela, id_campania: idCampania, id_establecimiento },
      attributes: ["id_parcela_cultivo", "fecha_inicio", "fecha_final", "cantidad_total_cosechada", "cantidad_sembrada", "activo"],
      include: [
        {
          model: CultivosModelo,
          attributes: ["descripcion_cultivo"],
        },
        {
          model: UnidadesMedidasModelo,
          attributes: ["descripcion_unidad_medida"],
          as: "unidadMedidaTotalSembrada",
        },
        {
          model: UnidadesMedidasModelo,
          attributes: ["descripcion_unidad_medida", "id_unidad_medida"],
          as: "unidadMedidaTotalCosechada",
        },
      ],
    });

    const cultivosActivos = await ParcelasCultivosModelo.count({
      raw: true,
      nest: true,
      where: {
        id_parcela: idParcela, id_campania: idCampania, id_establecimiento, activo: 1,
      },
    });
    console.log(cultivosActivos);
    // datosParcCultivo.cultivosActivos = validarAgregar;
    // await logSistema(req.decoded, datosParcCultivo.dataValues, "busqueda");

    if (!datosParcCultivo) {
      return res.status(400).json("No hay una datos parcela cultivo asociada a este ID");
    }
    return res.status(200).json({ datosParcCultivo, cultivosActivos });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postParcelaCultivo = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;

    const {
      id_parcela, id_cultivo, id_campania, cantidad_sembrada,
      unidad_medida_total_sembrada, fecha_inicio,
    } = req.body;

    const nuevoParcelaCultivo = await ParcelasCultivosModelo.create({
      id_parcela,
      id_cultivo,
      id_campania,
      cantidad_sembrada,
      unidad_medida_total_sembrada,
      fecha_inicio,
      id_establecimiento,
    });

    await logSistema(req.decoded, nuevoParcelaCultivo.dataValues, "creacion");

    return res.json({
      msg: "La Parcela_Cultivo se creo Correctamente",
      nuevoParcelaCultivo,
    });
  } catch (error) {
    console.log(error);
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
    } = req.body;

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
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const patchParcelaCultivo = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      cantidad_total_cosechada,
      fecha_final,
      unidad_medida_total_cosechada,
    } = req.body;

    const updateParcCult = await ParcelasCultivosModelo.findOne({
      where: { id_parcela_cultivo: id },
    });
    updateParcCult.cantidad_total_cosechada = cantidad_total_cosechada;
    updateParcCult.fecha_final = fecha_final;
    updateParcCult.unidad_medida_total_cosechada = unidad_medida_total_cosechada;
    updateParcCult.activo = "0";
    await updateParcCult.save();

    await logSistema(req.decoded, updateParcCult.dataValues, "actualizacion");

    res.json({
      msg: "La Parcela_Cultivo se actualizo Correctamente",
      updateParcCult,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteParcelaCultivo = async (req, res) => {
  try {
    const { id } = req.params;

    await ParcelasCultivosModelo.destroy(
      { where: { id_parcela_cultivo: id } },
    );

    // await logSistema(req.decoded, eliminarParcelaCultivo.dataValues, "eliminacion");

    res.status(200).json({
      message: `La Parcela_Cultivo con id ${id} fue eliminado`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
