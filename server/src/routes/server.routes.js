const { Router } = require('express');
const homeController = require('../controllers/home.controller');

const serverRouter = Router();

serverRouter.get('/', homeController);

module.exports = serverRouter;