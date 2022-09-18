// validar datos de los productos con express-validator
import { check, param } from "express-validator";
import { Op } from "sequelize";
import { ProductosModelo } from "../models/Productos.model.js";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { ProveedoresModelo } from "../models/Proveedores.model.js";
import { TiposProductosModelo } from "../models/TiposProductos.model.js";
import { UsuariosModelo } from "../models/Usuarios.model.js";
import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model.js";

export const getProductosMidd = [verificarCampos];

export const getProductoMidd = [
  param("id").custom(
    async (id_producto) => {
      try {
        const producto = await ProductosModelo.count({
          where: { id_producto },
        });
        if (producto === 0) {
          return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
  ),
  verificarCampos,
];

export const postProductoMidd = [
  check("descripcion_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion del producto es requerido")
    .custom(
      async (descripcion_producto) => {
        try {
          const producto = await ProductosModelo.count({
            where: { descripcion_producto },
          });
          // console.log(producto);
          if (producto > 0) {
            return Promise.reject("El producto ingresado ya se encuentra en la bd");
          }
        } catch (error) {
          return Promise.reject(error);
        }
      },
    ),
  check("fecha_vencimiento_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La fecha de vencimiento del producto es requerido"),
  check("cantidad_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La cantidad del producto es requerido")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser del tipo numerica mayor a 0"),
  check("id_proveedor")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id del proveedor es requerido")
    .custom(
      async (id_proveedor) => {
        try {
          const proveedor = await ProveedoresModelo.count({
            where: { id_proveedor },
          });
          // console.log(proveedor);
          if (proveedor === 0) {
            return Promise.reject("El id de proveedor ingresado no se encuentra en la bd");
          }
          // console.log("paso");
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      },
    ),
  check("id_tipo_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id del tipo producto es requerido")
    .custom(
      async (id_tipo_producto) => {
        try {
          const tipoProducto = await TiposProductosModelo.count({
            where: { id_tipo_producto },
          });
          // console.log(tipoProducto);
          if (tipoProducto === 0) {
            return Promise.reject("El id de tipo_producto ingresado no se encuentra en la bd");
          }
          // console.log("paso");
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      },
    ),

  check("id_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id del usuario es requerido")
    .custom(
      async (id_usuario) => {
        try {
          const usuario = await UsuariosModelo.count({
            where: { id_usuario },
          });
          // console.log(usuario);
          if (usuario === 0) {
            return Promise.reject("El id de usuario ingresado no se encuentra en la bd");
          }
          // console.log("paso");
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      },
    ),

  check("id_unidad_medida")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id del usuario es requerido")
    .custom(
      async (id_unidad_medida) => {
        try {
          const unidadMedida = await UnidadesMedidasModelo.count({
            where: { id_unidad_medida },
          });
          // console.log(unidadMedida);
          if (unidadMedida === 0) {
            return Promise.reject("El id de unidad medida ingresado no se encuentra en la bd");
          }
          // console.log("paso");
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      },
    ),
  verificarCampos,
];

export const putProductoMidd = [
  param("id").custom(
    async (id_producto) => {
      const producto = await ProductosModelo.count({
        where: { id_producto },
      });

      if (producto === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("descripcion_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion del producto es requerido")
    .custom(
      async (descripcion_producto, { req }) => {
        try {
          const id_producto = req.params.id;
          // console.log(id_producto);
          const producto = await ProductosModelo.count({
            where: { descripcion_producto, id_producto: { [Op.not]: id_producto } },
          });
          // console.log(producto);
          if (producto > 0) {
            return Promise.reject("La descripcion del producto ingresado ya se encuentra en la bd");
          }
        } catch (error) {
          return Promise.reject(error);
        }
      },
    ),
  check("fecha_vencimiento_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La fecha de vencimiento del producto es requerido"),
  check("cantidad_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La cantidad del producto es requerido")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser del tipo numerica mayor a 0"),
  check("id_proveedor")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id del proveedor es requerido")
    .custom(
      async (id_proveedor) => {
        try {
          const proveedor = await ProveedoresModelo.count({
            where: { id_proveedor },
          });
          if (proveedor === 0) {
            return Promise.reject("El id de proveedor ingresado no se encuentra en la bd");
          }
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      },
    ),
  check("id_tipo_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id del tipo producto es requerido")
    .custom(
      async (id_tipo_producto) => {
        try {
          const tipoProducto = await TiposProductosModelo.count({
            where: { id_tipo_producto },
          });
          if (tipoProducto === 0) {
            return Promise.reject("El id de tipo_producto ingresado no se encuentra en la bd");
          }
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      },
    ),

  check("id_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id del usuario es requerido")
    .custom(
      async (id_usuario) => {
        try {
          const usuario = await UsuariosModelo.count({
            where: { id_usuario },
          });
          if (usuario === 0) {
            return Promise.reject("El id de usuario ingresado no se encuentra en la bd");
          }
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      },
    ),

  check("id_unidad_medida")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id del usuario es requerido")
    .custom(
      async (id_unidad_medida) => {
        try {
          const unidadMedida = await UnidadesMedidasModelo.count({
            where: { id_unidad_medida },
          });
          if (unidadMedida === 0) {
            return Promise.reject("El id de unidad medida ingresado no se encuentra en la bd");
          }
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      },
    ),
  verificarCampos,
];

export const deleteCultivoMidd = [
  param("id").custom(
    async (id_producto) => {
      const producto = await ProductosModelo.count({
        where: { id_producto },
      });

      if (producto === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },

  ),
  verificarCampos,
];
