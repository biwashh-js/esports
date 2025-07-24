import express from 'express'
import { deleteUser, getAllUser, getById, updateProfile } from "../controllers/user.controller"
const router = express.Router()

router.get('/',getAllUser)
router.get('/:id',getById)
router.delete('/:id',deleteUser)
router.put('/:id',updateProfile)
export default router