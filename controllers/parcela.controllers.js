import { ParcelasModelo } from "../models/Parcelas.model.js";

// Devuelve todos los Parcelas de la colección
export const getParcelas = async (req, res) => {
  try {
    const Datos = await ParcelasModelo.findAll(); // consulta para todos los documentos
    // Respuesta del servidor
    res.json(Datos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getParcelaUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const Datos = await ParcelasModelo.findByPk(id); // consulta para todos los documentos

    // Respuesta del servidor
    res.json(Datos);
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

    res.json({
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
    const { georeferencia, superficie, id_establecimiento } = req.body[0];

    console.log(id);

    const updateParc = await ParcelasModelo.findOne({
      where: { id_parcela: id },
    });
    updateParc.georeferencia = georeferencia;
    updateParc.superficie = superficie;
    updateParc.id_establecimiento = id_establecimiento;
    await updateParc.save();

    res.json(updateParc);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteParcela = async (req, res) => {
  try {
    const { id } = req.params;

    await ParcelasModelo.destroy(
      {
        where: {
          id_parcela: id,
        },
      },
      console.log(id),
    );

    res.status(200).json({
      message: `La Parcela ${id} se elimino correctamente`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
