import dotenv from "dotenv";

dotenv.config();

export default function getConnectionData() {
  const {
    DATABASENAME,
    DATABASEUSER,
    DATABASEPASSWORD,
    DATABASENAME_TEST,
    DATABASEUSER_TEST,
    DATABASEPASSWORD_TEST,
  } = process.env;

  if (process.env.NODE_ENV === "test") {
    return {
      database: DATABASENAME_TEST,
      username: DATABASEUSER_TEST,
      password: DATABASEPASSWORD_TEST,
    };
  }
  return {
    database: DATABASENAME,
    username: DATABASEUSER,
    password: DATABASEPASSWORD,
  };
}
