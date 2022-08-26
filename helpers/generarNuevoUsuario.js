import { v4 as uuidv4 } from "uuid";

const generarNumero = () => Math.random() * (99999999 - 10000000) + 10000000;

export default function generarNuevoUsuario() {
  return ({
    nombre_persona: uuidv4(),
    apellido_persona: uuidv4(),
    dni_persona: generarNumero(),
    fecha_nac_persona: "20002/01/09",
    email_persona: `${uuidv4()}@gmail.com`,
    telefono_persona: generarNumero(),
    username_usuario: uuidv4(),
    password_usuario: "123456",
    id_tipo_usuario: 1,
  });
}
