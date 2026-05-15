import Router from 'express'
import {createUser, getUsers, getFilter} from '../controller/userController.js'

const userRouter = Router();

userRouter.post('/', createUser)
userRouter.get('/', getUsers)
userRouter.post('/', getFilter)

export default userRouter;