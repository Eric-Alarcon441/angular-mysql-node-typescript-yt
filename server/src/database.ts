import mysql from "mysql";
import keys from "./keys";

var pool = mysql.createPool(keys.database);

pool.getConnection((err, connection) => {
  if (err) console.log("Ocurrio un error ", err);

  if (connection) console.log("DB is connected");
});

export default pool;
