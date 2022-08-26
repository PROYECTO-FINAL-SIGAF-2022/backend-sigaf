export default async function recreateDatabase(connection) {
  await connection.query("DROP DATABASE IF EXISTS sigaf_test");
  await connection.query("CREATE DATABASE sigaf_test");
  await connection.query("USE sigaf_test");
  await connection.authenticate();
  await connection.sync();
}
