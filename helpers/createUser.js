import { UsuariosModelo } from "../models/Usuarios.model";
import { TiposUsuariosModelo } from "../models/TiposUsuarios.model";

export const crearUsuarios = async () => {
  await TiposUsuariosModelo.create({ descripcion_tipo_usuario: "Administrador" });

  await UsuariosModelo.create({
    nombre_persona: "Nombre Usuario",
    apellido_persona: "Apellido Usuario",
    dni_persona: "43711023",
    fecha_nac_persona: "2001/09/01",
    email_persona: "correo@gmail.com",
    telefono_persona: "3704871212",
    username_usuario: "usuariodev",
    password_usuario: "123456",
    id_tipo_usuario: "1",
  });
};
