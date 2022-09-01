import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model";

export const getUnidadesMedidas = async (req, res) => {
  try {
    const datos = await UnidadesMedidasModelo.findAll(); // consulta para todos los documentos
    // Respuesta del servidor
    res.json(datos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
