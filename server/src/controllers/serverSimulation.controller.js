const ServerSimulation = require('../models/ServerSimulation.model');
const { calculatePoissonProbability } = require('../utils/poissonCalculator');
const { 
  calculateServerMetrics, 
  calculateBoostRecommendations, 
  calculateLambda 
} = require('../services/serverMetricsService');
const { logServerStats } = require('../utils/logger');

// Save server simulation
exports.saveServerSimulation = async (req, res) => {
  try {
    const {
      arrival_rate,
      request_count,
      requests_per_second,
      queue_length,
      server_utilization
    } = req.body;

    // Calculate lambda and Poisson probability
    const lambda = calculateLambda(request_count, server_utilization);
    const { probability: poissonProb, calculation } = calculatePoissonProbability(lambda, request_count);

    // Calculate server performance metrics
    const performanceMetrics = calculateServerMetrics({
      queue_length,
      server_utilization,
      request_count
    });

    // Calculate boost recommendations
    const boostRecommendations = calculateBoostRecommendations(server_utilization);

    // Create simulation object
    const simulation = new ServerSimulation({
      arrival_rate,
      request_count,
      requests_per_second,
      queue_length,
      server_utilization,
      ...performanceMetrics,
      ...boostRecommendations,
      poisson_calculation: calculation
    });

    const savedSimulation = await simulation.save();

    // Log statistics to console
    logServerStats({ arrival_rate, requests_per_second, queue_length });

    res.status(201).json({
      success: true,
      data: savedSimulation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all server simulations
exports.getAllServerSimulations = async (req, res) => {
  try {
    const simulations = await ServerSimulation.find().sort({ timestamp: -1 });
    
    res.status(200).json({
      success: true,
      count: simulations.length,
      data: simulations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single server simulation
exports.getServerSimulation = async (req, res) => {
  try {
    const simulation = await ServerSimulation.findById(req.params.id);
    
    if (!simulation) {
      return res.status(404).json({
        success: false,
        message: 'Simulation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: simulation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get server statistics
exports.getServerStatistics = async (req, res) => {
  try {
    const simulations = await ServerSimulation.find();
    
    if (simulations.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          max_server_load: 0,
          average_queue_length: 0,
          total_simulations: 0,
          average_boost_efficiency: 0
        }
      });
    }

    const max_server_load = Math.max(...simulations.map(sim => sim.server_utilization));
    const average_queue_length = simulations.reduce((sum, sim) => sum + sim.queue_length, 0) / simulations.length;
    const average_boost_efficiency = simulations.reduce((sum, sim) => sum + (100 - sim.boost_percentage), 0) / simulations.length;

    res.status(200).json({
      success: true,
      data: {
        max_server_load: max_server_load.toFixed(2),
        average_queue_length: average_queue_length.toFixed(2),
        total_simulations: simulations.length,
        average_boost_efficiency: average_boost_efficiency.toFixed(2)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete server simulation
exports.deleteServerSimulation = async (req, res) => {
  try {
    const simulation = await ServerSimulation.findByIdAndDelete(req.params.id);
    
    if (!simulation) {
      return res.status(404).json({
        success: false,
        message: 'Simulation not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Simulation deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
