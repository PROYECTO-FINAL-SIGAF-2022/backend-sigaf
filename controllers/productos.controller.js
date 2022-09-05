import { ProductosModelo } from "../models/Productos.model";

// Devuelve todos los productos de la colección
export const getProductos = async (req, res) => {
  try {
    const productos = await ProductosModelo.findAll(); // consulta para todos los documentos

    res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getProductoUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await ProductosModelo.findByPk(id); // consulta para todos los documentos

    // Respuesta del servidor
    if (producto) {
      res.json(producto);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postPoducto = async (req, res) => {
  try {
    const {
      descripcion_producto,
      fecha_vencimiento_producto,
      cantidad_producto,
    } = req.body;

    const nuevoProducto = await ProductosModelo.create({
      descripcion_producto,
      fecha_vencimiento_producto,
      cantidad_producto,
    });

    res.status(201).json({
      msg: "El producto se creo Correctamente",
      nuevoProducto,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      descripcion_producto,
      fecha_vencimiento_producto,
      cantidad_producto,
    } = req.body;
    // console.log(id);

    const updateProduc = await ProductosModelo.findOne({
      where: { id_producto: id },
    });
    updateProduc.descripcion_producto = descripcion_producto;
    updateProduc.fecha_vencimiento_producto = fecha_vencimiento_producto;
    updateProduc.cantidad_producto = cantidad_producto;
    await updateProduc.save();

    res.status(201).json({
      msg: "El producto se actualizo Correctamente",
      updateProduc,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminarProducto = await ProductosModelo.findOne({ where: { id_producto: id } });

    eliminarProducto.activo = false;

    await eliminarProducto.save();

    res.status(201).json({
      msg: `El producto con id ${id} se elimino Correctamente`,
      updateProduc,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
