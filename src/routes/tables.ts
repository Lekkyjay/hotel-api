import express from 'express'
import { users } from '../controllers/tables'

const router = express.Router()

// api/table/users
router.post('/users', users)


export default router