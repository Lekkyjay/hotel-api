import express from 'express'
import { users } from '../controllers/tables'

const router = express.Router()

// api/table/users
router.get('/users', users)


export default router