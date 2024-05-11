import { Pool, Client } from 'pg'

const ssl = { rejectUnauthorized: false }

const pool = new Pool({ ssl })
const client = new Client({ ssl })

export { pool, client }