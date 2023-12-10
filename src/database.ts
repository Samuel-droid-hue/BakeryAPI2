/*import mysql from 'promise-mysql';
import keys from './keys';

const pool = mysql.createPool(keys.database);
pool.getConnection().then (connection => {
    pool.releaseConnection(connection);
    console.log("Database connected!");
});

export default pool;*/
import mysql from 'promise-mysql' //datos de la librería
import keys from './keys'
const  {createPool} = require("promise-mysql")
const  pool=  createPool(keys.database);
console.log("conectado")
export default pool