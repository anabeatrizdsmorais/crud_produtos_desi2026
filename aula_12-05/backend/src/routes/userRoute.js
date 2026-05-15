import Router from 'express'
import {createUser, getUsers} from '../controller/userController.js'

const userRouter = Router();

userRouter.post('/', createUser)
userRouter.get('/', getUsers)

export default userRouter;