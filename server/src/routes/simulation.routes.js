const express = require('express');
const router = express.Router();
const trafficSimulationController = require('../controllers/trafficSimulation.controller');
const serverSimulationController = require('../controllers/serverSimulation.controller');

// Traffic Simulation Routes
router.post('/traffic/simulations', trafficSimulationController.saveTrafficSimulation);
router.get('/traffic/simulations', trafficSimulationController.getAllTrafficSimulations);
router.get('/traffic/simulations/:id', trafficSimulationController.getTrafficSimulation);
router.get('/traffic/statistics', trafficSimulationController.getTrafficStatistics);
router.delete('/traffic/simulations/:id', trafficSimulationController.deleteTrafficSimulation);

// Server Simulation Routes
router.post('/server/simulations', serverSimulationController.saveServerSimulation);
router.get('/server/simulations', serverSimulationController.getAllServerSimulations);
router.get('/server/simulations/:id', serverSimulationController.getServerSimulation);
router.get('/server/statistics', serverSimulationController.getServerStatistics);
router.delete('/server/simulations/:id', serverSimulationController.deleteServerSimulation);

module.exports = router;
