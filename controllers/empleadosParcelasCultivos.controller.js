// import { logSistema } from "../helpers/createLog.js";

import { logSistema } from "../helpers/createLog.js";
import { EmpleadosParcelasCultivosModelo } from "../models/EmpleadosParcelasCultivos.model.js";

export const getEmpleadosParcelasCultivos = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;
    const empleadosParcelasCultivos = await EmpleadosParcelasCultivosModelo.findAll({ raw: true, where: { id_establecimiento } });

    if (empleadosParcelasCultivos.length === 0) {
      return res.status(400).json("No hay empleados asociadas a este establecimiento");
    }
    return res.status(200).json(empleadosParcelasCultivos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getEmpleadoParcelaCultivoUnico = async (req, res) => {
  try {
    const { id } = req.params;

    const empleadoParcelaCultivo = await EmpleadosParcelasCultivosModelo.findByPk(id);

    await logSistema(req.decoded, empleadoParcelaCultivo.dataValues, "busqueda");

    if (!empleadoParcelaCultivo) {
      return res.status(400).json("No hay empleados asociados a esta parcela asociada a este ID");
    }
    return res.status(200).json(empleadoParcelaCultivo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postEmpleadoParcelaCultivo = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;

    const {
      id_parcela_cultivo,
      id_usuario,
    } = req.body;

    const empleadoParcelaCultivo = await EmpleadosParcelasCultivosModelo.create({
      id_parcela_cultivo,
      id_usuario,
      id_establecimiento,
    });

    await logSistema(req.decoded, empleadoParcelaCultivo.dataValues, "creacion");

    res.status(201).json({
      msg: "Se asigno el empleado correctamente",
      empleadoParcelaCultivo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const putEmpleadoParcelaCultivo = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      id_parcela_cultivo,
      id_usuario,
    } = req.body;
    const empleadoParcelaCultivo = await EmpleadosParcelasCultivosModelo.findOne({
      where: { id_empleado_parcela_cultivo: id },
    });

    empleadoParcelaCultivo.id_parcela_cultivo = id_parcela_cultivo;
    empleadoParcelaCultivo.id_usuario = id_usuario;
    await empleadoParcelaCultivo.save();

    await logSistema(req.decoded, empleadoParcelaCultivo.dataValues, "actualizacion");

    res.status(200).json({
      msg: "El empleado parcela cultivo se actualizo correctamente",
      empleadoParcelaCultivo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteEmpleadoParcelaCultivo = async (req, res) => {
  try {
    const id_empleado_parcela_cultivo = req.params.id;

    const delEmpleadoParcelaCultivo = await EmpleadosParcelasCultivosModelo.findOne({
      where: { id_empleado_parcela_cultivo },
    });

    delEmpleadoParcelaCultivo.activo = false;
    await delEmpleadoParcelaCultivo.save();

    await logSistema(req.decoded, delEmpleadoParcelaCultivo.dataValues, "eliminacion");

    res.status(200).json({
      message: `Se elimino al empleado de la parcela ID: ${id_empleado_parcela_cultivo}`,
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
