import {Router} from 'express';
import homeController from '../controllers/home.controller.js';

const serverRouter = Router();

serverRouter.get('/', homeController);

export default serverRouter;