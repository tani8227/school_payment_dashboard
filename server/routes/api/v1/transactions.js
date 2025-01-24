import express from 'express';
const transactionsRouter = express.Router();
import passport from '../../../config/passport/passport-jwt.js'
import * as transactionsController from '../../../controller/transactions/transactions.js'
import * as transactionsStatusController from '../../../controller/transactions/transactions_status.js'

transactionsRouter.get('/',passport.authenticate('jwt', {session:false}), transactionsController.getTransactions)
transactionsRouter.get('/check-status', passport.authenticate('jwt', {session:false}), transactionsStatusController.getTransactionsStatus)
transactionsRouter.post('/update-status',passport.authenticate('jwt', {session:false}), transactionsStatusController.updateTransactionStatus)


export default transactionsRouter;