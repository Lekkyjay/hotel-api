import express from 'express'
import { envs, hello, helloDb, pgVersion } from '../controllers/hello'

const router = express.Router()

// api/hello
router.get('/', hello)

// api/hello/db
router.get('/db', helloDb)

// api/hello/version
router.get('/version', pgVersion)

// api/hello/envs
router.get('/envs', envs)

export default router