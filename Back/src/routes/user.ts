import express from 'express';
import { createUserCtrl } from '../controllers/user-ctrl';
export const routerUser = express.Router();

routerUser.post('/create', createUserCtrl as express.RequestHandler);
