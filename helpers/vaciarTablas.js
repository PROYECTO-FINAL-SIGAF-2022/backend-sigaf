import { connection } from "../config/connection.js";

export const vaciarTablas = async () => {
  await connection.query("SET GLOBAL FOREIGN_KEY_CHECKS=0;");

  const [tablas] = await connection.query("SHOW TABLES;");

  tablas.forEach(async (nombreTabla) => {
    await connection.query(`TRUNCATE TABLE ${nombreTabla.Tables_in_sigaf_test}`);
  });

  await connection.query("SET GLOBAL FOREIGN_KEY_CHECKS=1;");
};
