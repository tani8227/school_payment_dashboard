import express from 'express';
const v1Router = express.Router();
import homeRouter from './v1/index.js';

v1Router.use('/v1', homeRouter)


export default v1Router;