import express from 'express'
import { getAllUser, getById } from "../controllers/user.controller"
const router = express.Router()

router.get('/',getAllUser)
router.get('/:id',getById)

export default router