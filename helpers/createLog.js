import { LogSistema } from "../models/LogSistema.js";

export const logSistema = async (paramIdUsuario, paramDataLog, paramDescripcion) => {
  console.log(paramDataLog);

  const { id_usuario } = paramIdUsuario.paramUsuario;
  const dataLog = paramDataLog;

  await LogSistema.create({
    id_usuario,
    descripcion_log: `El usuario con ID ${id_usuario} realizo la siguiente ${paramDescripcion}, ${JSON.stringify(dataLog)}`,
  });
};
