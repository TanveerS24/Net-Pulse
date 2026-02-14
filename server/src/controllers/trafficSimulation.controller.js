const TrafficSimulation = require('../models/TrafficSimulation.model');

// Helper function to calculate factorial
const factorial = (n) => {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

// Helper function to calculate binomial coefficient (nCk)
const binomialCoefficient = (n, k) => {
  if (k > n) return 0;
  return factorial(n) / (factorial(k) * factorial(n - k));
};

// Calculate binomial probability
const calculateBinomialProbability = (n, k, p) => {
  const nCk = binomialCoefficient(n, k);
  const probability = nCk * Math.pow(p, k) * Math.pow(1 - p, n - k);
  
  // Generate step-by-step calculation
  const calculation = `
Step 1: Calculate nCk = ${n}C${k}
  nCk = ${n}! / (${k}! × ${n - k}!)
  nCk = ${factorial(n)} / (${factorial(k)} × ${factorial(n - k)})
  nCk = ${nCk}

Step 2: Apply Binomial Formula
  P(X = ${k}) = nCk × p^k × (1-p)^(n-k)
  P(X = ${k}) = ${nCk} × ${p}^${k} × ${(1 - p).toFixed(4)}^${n - k}
  P(X = ${k}) = ${nCk} × ${Math.pow(p, k).toFixed(6)} × ${Math.pow(1 - p, n - k).toFixed(6)}
  P(X = ${k}) = ${probability.toFixed(6)}

Result: ${(probability * 100).toFixed(4)}% probability
  `;
  
  return { probability, calculation };
};

// Save traffic simulation
exports.saveTrafficSimulation = async (req, res) => {
  try {
    const {
      total_packets,
      successful_packets,
      failed_packets
    } = req.body;

    // Calculate success probability
    const probability = successful_packets / total_packets;
    
    // Calculate binomial probability and get step-by-step calculation
    const { probability: binomialProb, calculation } = calculateBinomialProbability(
      total_packets,
      successful_packets,
      probability
    );

    // Calculate reliability metrics
    const reliability_score = (successful_packets / total_packets) * 100;
    const packet_loss_probability = 1 - probability;
    const retransmission_estimate = failed_packets * 1.5; // Estimated retransmissions

    // Calculate scaling recommendations
    const trafficGrowthRate = total_packets / 1000; // Normalized growth rate
    const horizontal_scaling = Math.ceil(trafficGrowthRate * 0.5); // Extra servers needed
    const vertical_scaling = Math.ceil(trafficGrowthRate * 20); // CPU/RAM increase %

    let scaling_recommendation = '';
    if (reliability_score >= 95) {
      scaling_recommendation = 'Excellent performance. No immediate scaling required.';
    } else if (reliability_score >= 80) {
      scaling_recommendation = `Moderate load detected. Consider adding ${horizontal_scaling} server(s) or increasing resources by ${vertical_scaling}%.`;
    } else {
      scaling_recommendation = `High load detected! Urgent scaling needed: Add ${horizontal_scaling} server(s) and increase resources by ${vertical_scaling}%.`;
    }

    const simulation = new TrafficSimulation({
      total_packets,
      successful_packets,
      failed_packets,
      probability,
      reliability_score,
      packet_loss_probability,
      retransmission_estimate,
      horizontal_scaling,
      vertical_scaling,
      scaling_recommendation,
      binomial_calculation: calculation
    });

    const savedSimulation = await simulation.save();

    // Log stats to server console
    console.log('\n' + '='.repeat(60));
    console.log('TRAFFIC SIMULATION SAVED');
    console.log('='.repeat(60));
    console.log(`Total Packets: ${total_packets.toLocaleString()}`);
    console.log(`Successful: ${successful_packets.toLocaleString()} (${reliability_score.toFixed(2)}%)`);
    console.log(`Failed: ${failed_packets.toLocaleString()} (${(packet_loss_probability * 100).toFixed(2)}%)`);
    console.log('='.repeat(60) + '\n');

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
