export const getVerificarRutasSistema = (paramRuta) => {
  const rutasDisponibles = ["usuarios", "establecimientos", "actividades", "campanias", "cultivos", "historiales", "parcelas", "parcelas-cultivos", "tipos-usuarios", "detalle-campanias", "tipo-productos", "agregar-parcela-cultivos", "proveedores", "unidades-medidas", "productos", "perdidas-parcelas-cultivos", "establecimientos-usuarios", "verificar-token-establecimiento-usuario"];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < paramRuta.length; i++) {
    if (!rutasDisponibles.includes(paramRuta[i])) {
      // console.log("entro");
      throw Error(`La ruta ${paramRuta[i]} no existe en el sistema`);
    }
  }

  return true;
};
