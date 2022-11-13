// import { logSistema } from "../helpers/createLog.js";

import sequelize from "sequelize";
import { logSistema } from "../helpers/createLog.js";
import { ContabilidadModelo } from "../models/Contabilidad.model.js";
import { CosechasModelo } from "../models/Cosechas.model.js";
import { CultivosModelo } from "../models/Cultivos.model.js";
import { ParcelasModelo } from "../models/Parcelas.model.js";
import { ParcelasCultivosModelo } from "../models/ParcelasCultivos.model.js";
import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model.js";

export const getContabilidad = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;
    const contabilidad = await ContabilidadModelo.findAll({ raw: true, where: { id_establecimiento } });

    if (contabilidad.length === 0) {
      return res.status(400).json("No hay registros de contabilidad asociadas a este establecimiento");
    }
    return res.status(200).json(contabilidad);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getContabilidadUnico = async (req, res) => {
  try {
    const { id } = req.params;

    const contabilidadUnico = await ContabilidadModelo.findByPk(id);

    await logSistema(req.decoded, contabilidadUnico.dataValues, "busqueda");

    if (!contabilidadUnico) {
      return res.status(400).json("No hay registros de contabilidad asociados a esta parcela con este ID");
    }
    return res.status(200).json(contabilidadUnico);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getContabilidadCampania = async (req, res) => {
  try {
    const { idCampania } = req.params;
    const { id_establecimiento } = req.decoded.paramUsuario;

    const parcelasCultivosByCampania = await ParcelasCultivosModelo.findAll({
      raw: true,
      nest: true,
      where: { id_campania: idCampania, id_establecimiento },
      include: [
        {
          model: CultivosModelo,
          attributes: ["id_cultivo", "descripcion_cultivo"],
          as: "cultivo",
        },
        {
          model: ParcelasModelo,
          attributes: ["id_parcela", "descripcion_parcela", "activo"],
          as: "parcela",
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
      attributes: ["id_parcela_cultivo", "cantidad_total_cosechada", "activo", "cantidad_sembrada"],
    });

    // console.log(parcelasCultivosByCampania);
    // await logSistema(req.decoded, parcelasCultivosByCampania.dataValues, "busqueda");

    if (parcelasCultivosByCampania.length === 0) {
      return res.status(400).json("No hay registros de parcelas cultivos asociados a esta campania");
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < parcelasCultivosByCampania.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const totalVendidoParcelaCultivo = await CosechasModelo.findAll({
        raw: true,
        nest: true,
        where: { id_parcela_cultivo: parcelasCultivosByCampania[i].id_parcela_cultivo },
        attributes: [[sequelize.fn("sum", sequelize.col("cantidad_total_vendida")), "sumaTotalCantidadVendida"]],
        include: [
          {
            model: UnidadesMedidasModelo,
            attributes: ["descripcion_unidad_medida"],
          },
        ],
      });

      // * PARA OBTENER LA CANTIDAD VENDIDA DE UNA PARCELA CULTIVO
      if (!totalVendidoParcelaCultivo[0].sumaTotalCantidadVendida && !totalVendidoParcelaCultivo[0].unidades_medida.descripcion_unidad_medida) {
        parcelasCultivosByCampania[i].sumaTotalCantidadVendida = "Aun no sea a realizado una venta";

        parcelasCultivosByCampania[i].sumaTotalCantidadStock = `${parcelasCultivosByCampania[i].cantidad_total_cosechada}-${parcelasCultivosByCampania[i].unidadMedidaTotalCosechada.descripcion_unidad_medida}`;
      } else {
        parcelasCultivosByCampania[i].sumaTotalCantidadVendida = `${totalVendidoParcelaCultivo[0].sumaTotalCantidadVendida}-${totalVendidoParcelaCultivo[0].unidades_medida.descripcion_unidad_medida}`;

        parcelasCultivosByCampania[i].sumaTotalCantidadStock = `${parcelasCultivosByCampania[i].cantidad_total_cosechada - totalVendidoParcelaCultivo[0].sumaTotalCantidadVendida}-${parcelasCultivosByCampania[i].unidadMedidaTotalCosechada.descripcion_unidad_medida}`;
      }
      // console.log(totalVendidoParcelaCultivo);

      // if (!totalVendidoParcelaCultivo[0].sumaTotalCantidadVendida) {
      // }
      // console.log(totalVendidoParcelaCultivo);
    }

    // parcelasCultivosByCampaniaAndSumaTotal = parcelasCultivosByCampania.map((parcelaCultivo) => {
    //   if (parcelaCultivo.id_parcela_cultivo === id_parcela_cultivo) {

    //   }
    // });
    // console.log(parcelasCultivosByCampania);
    // console.log(totalVendidoParcelaCultivo);

    return res.status(200).json(parcelasCultivosByCampania);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postContabilidad = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;

    const {
      descripcion_contabilidad,
      observacion_contabilidad,
      tipo_contabilidad,
      monto_contabilidad,
      id_parcela_cultivo,
    } = req.body;

    const contabilidadAgregada = await ContabilidadModelo.create({
      descripcion_contabilidad,
      observacion_contabilidad,
      tipo_contabilidad,
      monto_contabilidad,
      id_parcela_cultivo,
      id_establecimiento,
    });

    await logSistema(req.decoded, contabilidadAgregada.dataValues, "creacion");

    res.status(201).json({
      msg: "Se creo el registro de contabilidad correctamente",
      contabilidadAgregada,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const putContabilidad = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      descripcion_contabilidad,
      observacion_contabilidad,
      tipo_contabilidad,
      monto_contabilidad,
      id_parcela_cultivo,
    } = req.body;
    const contabilidadEditar = await ContabilidadModelo.findOne({
      where: { id_contabilidad: id },
    });

    contabilidadEditar.descripcion_contabilidad = descripcion_contabilidad;
    contabilidadEditar.observacion_contabilidad = observacion_contabilidad;
    contabilidadEditar.tipo_contabilidad = tipo_contabilidad;
    contabilidadEditar.monto_contabilidad = monto_contabilidad;
    contabilidadEditar.id_parcela_cultivo = id_parcela_cultivo;
    await contabilidadEditar.save();

    await logSistema(req.decoded, contabilidadEditar.dataValues, "actualizacion");

    res.status(200).json({
      msg: "Registro de contabilidad actualizado correctamente",
      contabilidadEditar,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteContabilidad = async (req, res) => {
  try {
    const id_contabilidad = req.params.id;

    const delContabilidad = await ContabilidadModelo.findOne({
      where: { id_contabilidad },
    });

    delContabilidad.activo = false;
    await delContabilidad.save();

    await logSistema(req.decoded, delContabilidad.dataValues, "eliminacion");

    res.status(200).json({
      message: `Se elimino el registro de contabilidad con ID: ${id_contabilidad}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteContabilidadCosecha = async (req, res) => {
  try {
    const { fecha } = req.params;
    // console.log(fecha);
    await ContabilidadModelo.destroy({
      where: { fecha_contabilidad: fecha },
    });
    await CosechasModelo.destroy({
      where: { fecha_venta: fecha },
    });

    // await logSistema(req.decoded, delContabilidad.dataValues, "eliminacion");

    res.status(200).json({
      message: `Se elimino el registro de cosecha y contabilidad con la fecha: ${fecha}`,
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
