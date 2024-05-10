import { Pool, Client } from 'pg'

const pool = new Pool({ ssl: { rejectUnauthorized: false } })
const client = new Client({ ssl: { rejectUnauthorized: false } })

export { pool, client }