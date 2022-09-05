import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model";

export const getUnidadesMedidas = async (req, res) => {
  try {
    const datos = await UnidadesMedidasModelo.findAll({where: { activo: true }}); // consulta para todos los documentos
    // Respuesta del servidor
    res.json(datos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getUnidadMedidaUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const dato = await UnidadesMedidasModelo.findByPk(id);

    res.json(dato);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postUnidadMedida = async (req, res) => {
  try {
    const { descripcion_unidad_medida } = req.body;

    const nuevaUnidadMedida = await UnidadesMedidasModelo.create({
      descripcion_unidad_medida,
    });

    res.json({
      msg: "La unidad de medida se creo correctamente",
      nuevaUnidadMedida,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUnidadMedida = async (req, res) => {
  try {
    const { id } = req.params;

    const { descripcion_unidad_medida } = req.body[0];

    const actualizarUnidadMedida = UnidadesMedidasModelo.findOne({
      where: { id_unidad_medida: id },
    });

    actualizarUnidadMedida.descripcion_unidad_medida = descripcion_unidad_medida;

    await actualizarUnidadMedida.save();

    actualizarUnidadMedida.descripcion_unidad_medida = actualizarUnidadMedida;
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUnidadMedida = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminarUnidadMedida = UnidadesMedidasModelo.findOne({
      where: { id_unidad_medida: id },
    });

    eliminarUnidadMedida.activo = false;

    await eliminarUnidadMedida.save();

    res.status(200).json({
      message: `La unidad de medida con id ${id} se elimino correctamente`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
