import { Pool, Client } from 'pg'

const ssl = process.env.NODE_ENV === 'production' ? true : { rejectUnauthorized: false }

const pool = new Pool({ ssl })
const client = new Client({ ssl })

export { pool, client }