import { ParcelasCultivosModelo } from "../models/ParcelasCultivos.model.js";

// Devuelve todos los Cultivos de la colección
export const getParcelasCultivos = async (req, res) => {
  try {
    const Datos = await ParcelasCultivosModelo.findAll(); // consulta para todos los documentos
    // Respuesta del servidor
    res.json(Datos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getParcelaCultivoUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const Datos = await ParcelasCultivosModelo.findByPk(id); // consulta para todos los documentos

    // Respuesta del servidor
    res.json(Datos);
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

    const nuevoParcela_Cultivo = await ParcelasCultivosModelo.create({
      id_parcela,
      id_cultivo,
      id_campania,
      cantidad_sembrada,
    });

    res.json({
      msg: "El Parcela_Cultivo se creo Correctamente",
      nuevoParcela_Cultivo,
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

    const updateParc_Cult = await ParcelasCultivosModelo.findOne({
      where: { id_parcelas_cultivos: id },
    });
    updateParc_Cult.id_parcela = id_parcela;
    updateParc_Cult.id_cultivo = id_cultivo;
    updateParc_Cult.id_campania = id_campania;
    updateParc_Cult.cantidad_sembrada = cantidad_sembrada;
    await updateParc_Cult.save();

    res.json(updateParc_Cult);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteParcelaCultivo = async (req, res) => {
  try {
    const { id } = req.params;

    await ParcelasCultivosModelo.destroy(
      {
        where: {
          id_parcelas_cultivos: id,
        },
      },
      console.log(id),
    );

    res.status(200).json({
      message: `El Parcela_Cultivo con id ${id} fue eliminado`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
