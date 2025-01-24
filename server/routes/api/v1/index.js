import express from 'express';
const homeRouter = express.Router();
import userRouter from './user.js';
import transactionsRouter from './transactions.js';


homeRouter.use('/user', userRouter)
homeRouter.use('/transactions', transactionsRouter)



export default homeRouter;