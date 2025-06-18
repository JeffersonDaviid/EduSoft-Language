import express from 'express';
import { createUserCtrl, loginUserCtrl, recoverPasswordCtrl } from '../controllers/user-ctrl';

export const routerUser = express.Router();

routerUser.post('/create', createUserCtrl as express.RequestHandler);
routerUser.post('/login', loginUserCtrl as express.RequestHandler);
routerUser.post('/recover-password', recoverPasswordCtrl as express.RequestHandler);