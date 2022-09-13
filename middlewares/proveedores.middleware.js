import { check, param } from "express-validator";
import { Op } from "sequelize";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { ProveedoresModelo } from "../models/Proveedores.model.js";

export const getProveedoresMidd = [verificarCampos];

export const getProveedorMidd = [
  param("id").custom(
    async (id_proveedor) => {
      const proveedor = await ProveedoresModelo.count({
        where: { id_proveedor },
      });

      if (proveedor === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

export const postProveedoresMidd = [
  check("nombre_proveedor")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El nombre del proveedor es requerida")
    .custom(
      async (nombre_proveedor) => {
        const proveedor = await ProveedoresModelo.count({
          where: { nombre_proveedor },
        });
        // console.log(proveedor);
        if (proveedor > 0) {
          return Promise.reject("El nombre del proveedor ingresado ya se encuentra en la bd");
        }
      },
    ),
  check("telefono_proveedor")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El apellido de la persona es requerida")
    .isLength(10)
    .withMessage("El telefono del proveedor debe tener una longitud de 10")
    .custom(
      async (telefono_proveedor) => {
        const proveedor = await ProveedoresModelo.count({
          where: { telefono_proveedor },
        });
        // console.log(proveedor);
        if (proveedor > 0) {
          return Promise.reject("El telefono del proveedor ingresado ya se encuentra en la bd");
        }
      },
    ),
  check("direccion_proveedor")
    .exists()
    .not()
    .withMessage("La direccion del proveedor es requerida")
    .isEmpty()
    .custom(
      async (direccion_proveedor) => {
        const proveedor = await ProveedoresModelo.count({
          where: { direccion_proveedor },
        });
        // console.log(proveedor);
        if (proveedor > 0) {
          return Promise.reject("La direccion del proveedor ingresado ya se encuentra en la bd");
        }
      },
    ),
  verificarCampos,
];

export const putProveedorMidd = [
  param("id").custom(
    async (id_proveedor) => {
      const proveedor = await ProveedoresModelo.count({
        where: { id_proveedor },
      });

      if (proveedor === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("nombre_proveedor")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El nombre del proveedor es requerida")
    .custom(
      async (nombre_proveedor, { req }) => {
        try {
          const id_proveedor = req.params.id;
          const proveedor = await ProveedoresModelo.count({
            where: { nombre_proveedor, id_proveedor: { [Op.not]: id_proveedor } },
          });
          // console.log(proveedor);
          if (proveedor > 0) {
            return Promise.reject("El nombre del proveedor ingresado ya se encuentra en la bd");
          }
        } catch (error) {
          // console.log(error);
          return Promise.reject(error);
        }
      },
    ),
  check("telefono_proveedor")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El apellido de la persona es requerida")
    .isLength(10)
    .withMessage("El telefono del proveedor debe tener una longitud de 10")
    .custom(
      async (telefono_proveedor, { req }) => {
        try {
          const id_proveedor = req.params.id;
          const proveedor = await ProveedoresModelo.count({
            where: { telefono_proveedor, id_proveedor: { [Op.not]: id_proveedor } },
          });
          // console.log(proveedor);
          if (proveedor > 0) {
            return Promise.reject("El telefono del proveedor ingresado ya se encuentra en la bd");
          }
        } catch (error) {
          // console.log(error);
          return Promise.reject(error);
        }
      },
    ),
  check("direccion_proveedor")
    .exists()
    .not()
    .withMessage("La direccion del proveedor es requerida")
    .isEmpty()
    .custom(
      async (direccion_proveedor, { req }) => {
        try {
          const id_proveedor = req.params.id;
          // console.log(id_proveedor);
          const proveedor = await ProveedoresModelo.count({
            where: { direccion_proveedor, id_proveedor: { [Op.not]: id_proveedor } },
          });
          // console.log(proveedor);
          if (proveedor > 0) {
            return Promise.reject("La direccion del proveedor ingresado ya se encuentra en la bd");
          }
        } catch (error) {
          // console.log(error);
          return Promise.reject(error);
        }
      },
    ),
  verificarCampos,
];
export const deleteProveedoresMidd = [
  param("id").custom(
    async (id_proveedor) => {
      const proveedor = await ProveedoresModelo.count({
        where: { id_proveedor },
      });

      if (proveedor === 0) {
        return Promise.reject();
      }
    },

  ).withMessage("El id enviado no se coincide con ningun registro de la base de datos"),
  verificarCampos,
];
