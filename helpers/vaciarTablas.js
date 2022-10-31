import mariadb from "mariadb";

export const vaciarTablas = async () => {
  const resultArgServerLocal = process.argv.find((arg) => arg.includes("server=local"));

  let config = null;

  if (!resultArgServerLocal) {
    config = {
      user: "root",
      host: "45.7.228.229",
      password: "root",
      database: "sigaf_test",
    };
  } else {
    config = {
      host: "localhost",
      user: "root",
      password: "",
      database: "sigaf_test",
    };
  }

  // console.log(config);
  const conn = await mariadb.createConnection(config);

  // console.log(conn);

  const tablas = await conn.query("SHOW TABLES");
  await conn.query("SET FOREIGN_KEY_CHECKS=0");

  tablas.forEach(async (nombreTabla) => {
    // console.log(nombreTabla);
    try {
      await conn.query(`TRUNCATE TABLE ${nombreTabla.Tables_in_sigaf_test}`);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  });
  await conn.query("SET FOREIGN_KEY_CHECKS=1");
  await conn.end();
};
