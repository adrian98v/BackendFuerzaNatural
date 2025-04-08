import { createPool } from "mysql2";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: 3306,
    database: 'fuerzanatural'
})