const TrafficSimulation = require('../models/TrafficSimulation.model');
const { calculateBinomialProbability } = require('../utils/binomialCalculator');
const { 
  calculateReliabilityMetrics, 
  calculateTrafficScaling 
} = require('../services/trafficMetricsService');
const { logTrafficStats } = require('../utils/logger');

// Save traffic simulation
exports.saveTrafficSimulation = async (req, res) => {
  try {
    const {
      total_packets,
      successful_packets,
      failed_packets
    } = req.body;

    // Calculate reliability metrics
    const reliabilityMetrics = calculateReliabilityMetrics({
      total_packets,
      successful_packets,
      failed_packets
    });

    // Calculate binomial probability
    const { probability: binomialProb, calculation } = calculateBinomialProbability(
      total_packets,
      successful_packets,
      reliabilityMetrics.probability
    );

    // Calculate scaling recommendations
    const scalingMetrics = calculateTrafficScaling({
      total_packets,
      reliability_score: reliabilityMetrics.reliability_score
    });

    // Create simulation object
    const simulation = new TrafficSimulation({
      total_packets,
      successful_packets,
      failed_packets,
      ...reliabilityMetrics,
      ...scalingMetrics,
      binomial_calculation: calculation
    });

    const savedSimulation = await simulation.save();

    // Log statistics to console
    logTrafficStats({
      total_packets,
      successful_packets,
      failed_packets,
      reliability_score: reliabilityMetrics.reliability_score,
      packet_loss_probability: reliabilityMetrics.packet_loss_probability
    });

    res.status(201).json({
      success: true,
      data: savedSimulation
    });
  } catch (error) {
    console.error('Error saving traffic simulation:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all traffic simulations
exports.getAllTrafficSimulations = async (req, res) => {
  try {
    const simulations = await TrafficSimulation.find().sort({ timestamp: -1 });
    
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

// Get single traffic simulation
exports.getTrafficSimulation = async (req, res) => {
  try {
    const simulation = await TrafficSimulation.findById(req.params.id);
    
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

// Get traffic statistics
exports.getTrafficStatistics = async (req, res) => {
  try {
    const simulations = await TrafficSimulation.find();
    
    if (simulations.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          average_reliability: 0,
          peak_traffic: 0,
          total_simulations: 0,
          average_scaling_efficiency: 0
        }
      });
    }

    const average_reliability = simulations.reduce((sum, sim) => sum + sim.reliability_score, 0) / simulations.length;
    const peak_traffic = Math.max(...simulations.map(sim => sim.total_packets));
    const average_scaling_efficiency = simulations.reduce((sum, sim) => sum + (100 - sim.vertical_scaling), 0) / simulations.length;

    res.status(200).json({
      success: true,
      data: {
        average_reliability: average_reliability.toFixed(2),
        peak_traffic,
        total_simulations: simulations.length,
        average_scaling_efficiency: average_scaling_efficiency.toFixed(2)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete traffic simulation
exports.deleteTrafficSimulation = async (req, res) => {
  try {
    const simulation = await TrafficSimulation.findByIdAndDelete(req.params.id);
    
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
