import express from 'express'
import { getUsers, loginUser, logout, registerUser, validToken } from '../controllers/auth'
import { verifyToken } from '../middlewares/auth'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logout)
router.get('/users', getUsers)
router.get('/validate-token', verifyToken, validToken)

export default router
