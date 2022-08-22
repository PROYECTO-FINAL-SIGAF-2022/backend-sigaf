import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();
// retorna una el token generado con los datos del usuario
export const generarJwt = (paramUsuario) => {
  const payload = { paramUsuario };
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.PRIVATE_KEY, (err, token) => {
      if (err) {
        reject('error al crear el token' + err);
      }
      resolve(token);
    });
  });
};
