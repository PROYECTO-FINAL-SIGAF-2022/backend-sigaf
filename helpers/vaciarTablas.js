import mariadb from "mariadb";

export const vaciarTablas = async () => {
  const conn = await mariadb.createConnection({
    user: "root",
    host: "45.7.228.229",
    password: "root",
    database: "sigaf_test",
  });

  const tablas = await conn.query("SHOW TABLES");
  await conn.query("SET FOREIGN_KEY_CHECKS=0");

  tablas.forEach(async (nombreTabla) => {
    // console.log(nombreTabla);
    try {
      await conn.query(`TRUNCATE TABLE ${nombreTabla.Tables_in_sigaf_test}`);
      // console.log(result);
    } catch (error) {
      // console.log(error);
    }
  });
  await conn.query("SET FOREIGN_KEY_CHECKS=1");
  await conn.end();
};
