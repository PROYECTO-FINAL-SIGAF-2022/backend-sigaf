import { logSistema } from "../helpers/createLog.js";
import { generarJwt } from "../helpers/generarJwt.js";
import { EstablecimientosModelo } from "../models/Establecimientos.model.js";

// Devuelve todos los Establecimientos de la colección
export const getEstablecimientos = async (req, res) => {
  try {
    const establecimientos = await EstablecimientosModelo.findAll(); // consulta para todos los documentos
    // Respuesta del servidor
    res.status(200).json(establecimientos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getEstablecimientoUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const establecimiento = await EstablecimientosModelo.findByPk(id); // consulta para todos los documentos

    await logSistema(req.decoded, establecimiento.dataValues, "busqueda");

    // Respuesta del servidor
    res.status(200).json(establecimiento);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postEstablecimiento = async (req, res) => {
  try {
    const {
      descripcion_establecimiento,
      georeferencia,
      superficie,
      id_usuario,
    } = req.body;

    const nuevoEstablecimiento = await EstablecimientosModelo.create({
      descripcion_establecimiento,
      georeferencia,
      superficie,
      id_usuario,
    });

    await logSistema(req.decoded, nuevoEstablecimiento.dataValues, "creacion");

    res.status(201).json({
      msg: "El Establecimiento se creo Correctamente",
      nuevoEstablecimiento,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateEstablecimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion_establecimiento, georeferencia, superficie } = req.body;
    // console.log(id);
    const updateEstab = await EstablecimientosModelo.findOne({
      where: { id_establecimiento: id },
    });
    updateEstab.descripcion_establecimiento = descripcion_establecimiento;
    updateEstab.georeferencia = georeferencia;
    updateEstab.superficie = superficie;
    await updateEstab.save();

    await logSistema(req.decoded, updateEstab.dataValues, "actualizacion");

    res.json({
      msg: "El Establecimiento se actualizo Correctamente",
      updateEstab,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteEstablecimiento = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminarEstablecimiento = await EstablecimientosModelo.findOne({ where: { id_establecimiento: id } });

    eliminarEstablecimiento.activo = false;

    await eliminarEstablecimiento.save();

    await logSistema(req.decoded, eliminarEstablecimiento.dataValues, "eliminacion");

    res.status(200).json({
      msg: `El establecimiento con el ID: ${id} se elimino correctamente`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getEstablecimientosUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.decoded.paramUsuario;
    const establecimientosUsuarios = await EstablecimientosModelo.findAll({
      where: {
        id_usuario,
      },
    });

    res.status(200).json(establecimientosUsuarios);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getTokenEstablecimientoUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.decoded.paramUsuario;
    const id_establecimiento = req.params.id;

    const token = await generarJwt({
      id_usuario,
      id_establecimiento,
    });

    console.log(token);
    res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getVerificarTokenEstablecimientoUsuario = async (req, res) => {
  try {
    const dataToken = req.decoded.paramUsuario;

    if (!Object.prototype.hasOwnProperty.call(dataToken, "id_establecimiento")) {
      return res.status(400).json("Token no posee id_establecimiento");
    }

    // const token = await generarJwt({
    //   id_usuario,
    //   id_establecimiento,
    // });

    // console.log(token);
    return res.status(200).json("Token posee id_establecimiento");
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
