import express from 'express';
const userRouter = express.Router();
import * as userController from '../../../controller/user/user.js'



userRouter.post('/sign-up', userController.SignUp)
userRouter.post('/login', userController.SignIn)
userRouter.get('/get', userController.getUser)


export default userRouter;