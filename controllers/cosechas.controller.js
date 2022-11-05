// import { logSistema } from "../helpers/createLog.js";

import { logSistema } from "../helpers/createLog.js";
import { CosechasModelo } from "../models/Cosechas.model.js";

export const getCosechas = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;
    const cosechas = await CosechasModelo.findAll({ raw: true, where: { id_establecimiento } });

    // console.log(id_establecimiento);
    if (cosechas.length === 0) {
      return res.status(400).json("No hay cosechas asociadas a este establecimiento");
    }
    return res.status(200).json(cosechas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getCosecha = async (req, res) => {
  try {
    const { id } = req.params;

    const cosecha = await CosechasModelo.findByPk(id);

    await logSistema(req.decoded, cosecha.dataValues, "busqueda");

    if (!cosecha) {
      return res.status(400).json("No hay cosechas asociadas a este ID");
    }
    return res.status(200).json(cosecha);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postCosecha = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;

    const {
      cantidad_total_vendida,
      precio_venta,
      id_parcela_cultivo,
      id_unidad_medida,
    } = req.body;

    const cosechaCreado = await CosechasModelo.create({
      cantidad_total_vendida,
      precio_venta,
      id_parcela_cultivo,
      id_unidad_medida,
      id_establecimiento,
    });

    await logSistema(req.decoded, cosechaCreado.dataValues, "creacion");

    res.status(201).json({
      msg: "Se creo la cosecha correctamente",
      cosechaCreado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const putCosecha = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      cantidad_total_vendida,
      precio_venta,
      id_parcela_cultivo,
      id_unidad_medida,
    } = req.body;
    const updCosecha = await CosechasModelo.findOne({
      where: { id_cosecha: id },
    });

    updCosecha.cantidad_total_vendida = cantidad_total_vendida;
    updCosecha.precio_venta = precio_venta;
    updCosecha.id_parcela_cultivo = id_parcela_cultivo;
    updCosecha.id_unidad_medida = id_unidad_medida;
    await updCosecha.save();

    await logSistema(req.decoded, updCosecha.dataValues, "actualizacion");

    res.status(200).json({
      msg: "La venta de cosecha se actualizo correctamente",
      updCosecha,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCosecha = async (req, res) => {
  try {
    const id_cosecha = req.params.id;

    const delCosecha = await CosechasModelo.destroy({
      where: { id_cosecha },
    });

    // delCosecha.activo = false;
    // await delCosecha.save();

    await logSistema(req.decoded, delCosecha.dataValues, "eliminacion");

    res.status(200).json({
      message: `Se elimino la venta de cosecha con ID: ${id_cosecha}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
// export const putVenderMaquina = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const {
//       precio_venta_maquina,
//       fecha_venta_maquina,
//     } = req.body;
//     const venderMaquina = await MaquinasModelo.findOne({
//       where: { id_maquina: id },
//     });

//     venderMaquina.precio_venta_maquina = precio_venta_maquina;
//     venderMaquina.fecha_venta_maquina = fecha_venta_maquina;
//     venderMaquina.activo = "0";
//     await venderMaquina.save();

//     await logSistema(req.decoded, venderMaquina.dataValues, "actualizacion");

//     res.status(200).json({
//       msg: "La maquina se actualizo Correctamente",
//       venderMaquina,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// };
