import { logSistema } from "../helpers/createLog.js";
import { ActividadesModelo } from "../models/Actividades.model.js";
import { HistorialesParcelasCultivosModelo } from "../models/HistorialesParcelasCultivos.model.js";
import { MaquinasModelo } from "../models/Maquinas.model.js";
import { ParcelasCultivosModelo } from "../models/ParcelasCultivos.model.js";
import { ProductosModelo } from "../models/Productos.model.js";
import { UsuariosModelo } from "../models/Usuarios.model.js";

export const getHistoriales = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;

    const historial = await HistorialesParcelasCultivosModelo.findAll({ raw: true, where: { id_establecimiento, activo: true } });

    if (historial.length === 0) {
      return res.status(400).json("No hay historiales asociadas a este establecimiento");
    }
    return res.status(200).json(historial);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getHistorialUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const historial = await HistorialesParcelasCultivosModelo.findByPk(id);

    await logSistema(req.decoded, historial.dataValues, "busqueda");

    if (!historial) {
      return res.status(400).json("No hay una historial asociado a este ID");
    }
    return res.status(200).json(historial);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getHistorialParcelaCultivo = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_establecimiento } = req.decoded.paramUsuario;

    const { id_parcela_cultivo } = await ParcelasCultivosModelo.findOne({
      raw: true,
      where: { id_parcela: id, activo: 1 },
    });
    const historial = await HistorialesParcelasCultivosModelo.findAll({
      raw: true,
      nest: true,
      where: { id_parcela_cultivo, id_establecimiento },
      attributes: ["id_historial_parcelas_cultivos", "activo", "cantidad_uso_producto", "fecha_historial"],
      include: [
        {
          model: ActividadesModelo,
          attributes: ["descripcion_actividad"],
        },
        {
          model: MaquinasModelo,
          attributes: ["descripcion_maquina"],
          // as: "unidadMedidaTotalSembrada",
        },
        {
          model: ProductosModelo,
          attributes: ["descripcion_producto"],
          // as: "unidadMedidaTotalCosechada",
        },
        {
          model: UsuariosModelo,
          attributes: ["nombre_persona", "apellido_persona"],
          // as: "unidadMedidaTotalCosechada",
        },
      ],
    });

    // await logSistema(req.decoded, historial.dataValues, "busqueda");
    console.log(historial);
    if (!historial) {
      return res.status(400).json("No hay una historial asociado a este ID");
    }
    return res.status(200).json(historial);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postHistorial = async (req, res) => {
  try {
    const { id } = req.params;

    const { id_establecimiento } = req.decoded.paramUsuario;

    const {
      id_actividad,
      id_usuario,
      cantidad_uso_producto,
      id_producto,
      fecha_historial,
      id_maquina,
    } = req.body;

    const { id_parcela_cultivo } = await ParcelasCultivosModelo.findOne({
      raw: true,
      where: { id_parcela: id, activo: 1 },
    });
    const nuevoHistorial = await HistorialesParcelasCultivosModelo.create({
      id_parcela_cultivo,
      id_actividad,
      id_usuario,
      cantidad_uso_producto,
      id_producto,
      fecha_historial,
      id_maquina,
      id_establecimiento,
    });

    // await logSistema(req.decoded, nuevoHistorial.dataValues, "creacion");

    return res.json({
      msg: "El Historial se creo Correctamente",
      nuevoHistorial,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateHistorial = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_parcela_cultivo,
      id_actividad,
      id_usuario,
      cantidad_uso_producto,
      id_producto,
    } = req.body;

    // console.log(id_parcela_cultivo);

    const updateHist = await HistorialesParcelasCultivosModelo.findOne({
      where: { id_historial_parcelas_cultivos: id },
    });
    // console.log(updateHist.id_parcela_cultivo);
    updateHist.id_parcela_cultivo = id_parcela_cultivo;
    updateHist.id_actividad = id_actividad;
    updateHist.id_usuario = id_usuario;
    updateHist.cantidad_uso_producto = cantidad_uso_producto;
    updateHist.id_producto = id_producto;
    await updateHist.save();

    await logSistema(req.decoded, updateHist.dataValues, "atualizacion");

    res.json({
      msg: "El Historial se actualizo Correctamente",
      updateHist,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteHistorial = async (req, res) => {
  try {
    const { id } = req.params;

    await HistorialesParcelasCultivosModelo.destroy({ where: { id_historial_parcelas_cultivos: id } });

    // eliminarHistorial.activo = false;

    // await eliminarHistorial.save();

    // await logSistema(req.decoded, eliminarHistorial.dataValues, "eliminacion");

    res.json({
      message: `El Historial con el id ${id} se elimino correctamente`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
