import { PerdidasParcelasCultivosModelo } from "../models/PerdidasParcelasCultivos.model.js";

//TODO: falta agregar el activo en el modelo y controlador
export const getPerdidasParcelasCultivos = async (req, res) => {
  try {
    const datos = await PerdidasParcelasCultivosModelo.findAll(); // consulta para todos los documentos
    // Respuesta del servidor
    res.json(datos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getPerdidaParcelaCultivoUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const dato = await PerdidasParcelasCultivosModelo.findByPk(id);

    res.json(dato);
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

    res.status(200).json({
      message: `La Perdida Parcela-Cultivo con id ${id} se elimino correctamente`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
