import { TiposUsuariosModelo } from "../models/TiposUsuarios.model.js";
import { UsuariosModelo } from "../models/Usuarios.model.js";

export const validarAccesoRutas = async (req, res, next) => {
  try {
    const { path } = req.route;
    const [, pathRuta] = path.split("/");
    //   obtener el id del usuario que realizo la peticion
    const { id_usuario } = req.decoded.paramUsuario;

    //   obtener rutas disponibles para el usuario que trata de acceder a la ruta
    const { dataValues } = await UsuariosModelo.findOne({
      where: { id_usuario },
      include: [
        { model: TiposUsuariosModelo },
      ],
    });

    const { rutas_usuario } = dataValues.tipo_usuario.dataValues;

    const rutasParseada = JSON.parse(rutas_usuario);

    // console.log(rutasParseada);
    // console.log(pathRuta);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < rutasParseada.length; i++) {
      if (rutasParseada[i].includes(pathRuta)) {
        return next();
      }
    }
    return res.status(401).send({
      success: false,
      message: "Su usuario no posee los privilegios para interactuar con esta ruta",
    });
  } catch (error) {
    // console.log(error);

    return res.status(401).send({
      success: error,
    });
  }
};
