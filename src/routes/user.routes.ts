import express from 'express'
import { deleteUser, getAllUser, getById } from "../controllers/user.controller"
const router = express.Router()

router.get('/',getAllUser)
router.get('/:id',getById)
router.delete('/:id',deleteUser)
export default router