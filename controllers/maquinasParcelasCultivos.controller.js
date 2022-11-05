// import { logSistema } from "../helpers/createLog.js";

import { logSistema } from "../helpers/createLog.js";
import { MaquinasParcelasCultivosModelo } from "../models/MaquinasParcelasCultivos.model.js";

export const getMaquinasParcelasCultivos = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;
    const maquinasParcelasCultivos = await MaquinasParcelasCultivosModelo.findAll({ raw: true, where: { id_establecimiento } });

    if (maquinasParcelasCultivos.length === 0) {
      return res.status(400).json("No hay maquinas asociadas a este establecimiento");
    }
    return res.status(200).json(maquinasParcelasCultivos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getMaquinaParcelaCultivoUnico = async (req, res) => {
  try {
    const { id } = req.params;

    const maquinaParcelaCultivo = await MaquinasParcelasCultivosModelo.findByPk(id);

    await logSistema(req.decoded, maquinaParcelaCultivo.dataValues, "busqueda");

    if (!maquinaParcelaCultivo) {
      return res.status(400).json("No hay maquinas asociadas a esta parcela asociada a este ID");
    }
    return res.status(200).json(maquinaParcelaCultivo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postMaquinaParcelaCultivo = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;

    const {
      id_parcela_cultivo,
      id_maquina,
    } = req.body;

    const maquinaParcelaCultivo = await MaquinasParcelasCultivosModelo.create({
      id_parcela_cultivo,
      id_maquina,
      id_establecimiento,
    });

    await logSistema(req.decoded, maquinaParcelaCultivo.dataValues, "creacion");

    res.status(201).json({
      msg: "Se asigno la maquina correctamente",
      maquinaParcelaCultivo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const putMaquinaParcelaCultivo = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      id_parcela_cultivo,
      id_maquina,
    } = req.body;
    const maquinaParcelaCultivo = await MaquinasParcelasCultivosModelo.findOne({
      where: { id_maquina_parcela_cultivo: id },
    });

    maquinaParcelaCultivo.id_parcela_cultivo = id_parcela_cultivo;
    maquinaParcelaCultivo.id_maquina = id_maquina;
    await maquinaParcelaCultivo.save();

    await logSistema(req.decoded, maquinaParcelaCultivo.dataValues, "actualizacion");

    res.status(200).json({
      msg: "La maquina parcela cultivo se actualizo correctamente",
      maquinaParcelaCultivo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteMaquinaParcelaCultivo = async (req, res) => {
  try {
    const id_maquina_parcela_cultivo = req.params.id;

    const delMaquinaParcelaCultivo = await MaquinasParcelasCultivosModelo.findOne({
      where: { id_maquina_parcela_cultivo },
    });

    delMaquinaParcelaCultivo.activo = false;
    await delMaquinaParcelaCultivo.save();

    await logSistema(req.decoded, delMaquinaParcelaCultivo.dataValues, "eliminacion");

    res.status(200).json({
      message: `Se elimino la maquina de la parcela ID: ${id_maquina_parcela_cultivo}`,
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
