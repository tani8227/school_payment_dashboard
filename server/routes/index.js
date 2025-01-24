import express from 'express';
const apiRouter = express.Router();
import v1Router from './api/index.js';

apiRouter.use('/api',v1Router)


export default apiRouter;