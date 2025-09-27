import { Pool } from 'pg';
import { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } from '../config/env';

const pgPool = new Pool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
})

pgPool.connect();

export { pgPool };