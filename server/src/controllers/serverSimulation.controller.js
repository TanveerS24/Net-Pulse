const ServerSimulation = require('../models/ServerSimulation.model');

// Helper function to calculate factorial
const factorial = (n) => {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

// Calculate Poisson probability
const calculatePoissonProbability = (lambda, k) => {
  const e = Math.E;
  const probability = (Math.pow(lambda, k) * Math.pow(e, -lambda)) / factorial(k);
  
  // Generate step-by-step calculation
  const calculation = `
Step 1: Identify Parameters
  λ (lambda) = ${lambda.toFixed(4)} (arrival rate)
  k = ${k} (number of events)
  e = ${e.toFixed(6)} (Euler's number)

Step 2: Calculate λ^k
  λ^k = ${lambda.toFixed(4)}^${k}
  λ^k = ${Math.pow(lambda, k).toFixed(6)}

Step 3: Calculate e^(-λ)
  e^(-λ) = ${e.toFixed(6)}^(-${lambda.toFixed(4)})
  e^(-λ) = ${Math.pow(e, -lambda).toFixed(6)}

Step 4: Calculate k!
  k! = ${k}!
  k! = ${factorial(k)}

Step 5: Apply Poisson Formula
  P(X = ${k}) = (λ^k × e^(-λ)) / k!
  P(X = ${k}) = (${Math.pow(lambda, k).toFixed(6)} × ${Math.pow(e, -lambda).toFixed(6)}) / ${factorial(k)}
  P(X = ${k}) = ${(Math.pow(lambda, k) * Math.pow(e, -lambda)).toFixed(8)} / ${factorial(k)}
  P(X = ${k}) = ${probability.toFixed(8)}

Result: ${(probability * 100).toFixed(6)}% probability
  `;
  
  return { probability, calculation };
};

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

    // Calculate lambda for Poisson distribution
    // lambda = request_count * (success_rate)
    // Using server_utilization as a proxy for success rate (higher utilization = more successful processing)
    const success_rate = server_utilization / 100;
    const lambda = request_count * success_rate;

    // Calculate Poisson probability for current request count
    const { probability: poissonProb, calculation } = calculatePoissonProbability(
      lambda,
      request_count
    );

    // Calculate server performance metrics
    const overload_probability = server_utilization > 80 ? (server_utilization - 80) / 20 : 0;
    const expected_delay = queue_length * 0.1; // Estimated delay in seconds
    const congestion_risk = (queue_length / (request_count + 1)) * 100;

    // Calculate boost recommendations
    let boost_percentage = 0;
    let cpu_scaling = 0;
    let instance_scaling = 0;
    let auto_scaling_threshold = 70;

    if (server_utilization >= 90) {
      boost_percentage = 50;
      cpu_scaling = 40;
      instance_scaling = 3;
      auto_scaling_threshold = 75;
    } else if (server_utilization >= 80) {
      boost_percentage = 30;
      cpu_scaling = 25;
      instance_scaling = 2;
      auto_scaling_threshold = 70;
    } else if (server_utilization >= 70) {
      boost_percentage = 15;
      cpu_scaling = 15;
      instance_scaling = 1;
      auto_scaling_threshold = 65;
    }

    let boost_recommendation = '';
    if (server_utilization >= 90) {
      boost_recommendation = `CRITICAL: Server overload detected! Immediate action required:\n- Scale CPU by ${cpu_scaling}%\n- Add ${instance_scaling} instances\n- Enable auto-scaling at ${auto_scaling_threshold}% threshold`;
    } else if (server_utilization >= 80) {
      boost_recommendation = `WARNING: High server load. Recommended actions:\n- Scale CPU by ${cpu_scaling}%\n- Add ${instance_scaling} instances\n- Monitor and set auto-scaling at ${auto_scaling_threshold}%`;
    } else if (server_utilization >= 70) {
      boost_recommendation = `MODERATE: Consider performance optimization:\n- Scale CPU by ${cpu_scaling}%\n- Add ${instance_scaling} instance for redundancy\n- Set auto-scaling threshold at ${auto_scaling_threshold}%`;
    } else {
      boost_recommendation = 'Optimal performance. Server running efficiently. No immediate action required.';
    }

    const simulation = new ServerSimulation({
      arrival_rate,
      request_count,
      requests_per_second,
      queue_length,
      server_utilization,
      overload_probability,
      expected_delay,
      congestion_risk,
      boost_percentage,
      cpu_scaling,
      instance_scaling,
      auto_scaling_threshold,
      boost_recommendation,
      poisson_calculation: calculation
    });

    const savedSimulation = await simulation.save();

    // Log stats to server console
    console.log('\n' + '='.repeat(60));
    console.log('SERVER SIMULATION SAVED');
    console.log('='.repeat(60));
    console.log(`Arrival Rate: ${arrival_rate.toFixed(2)} req/sec`);
    console.log(`Requests/Second: ${requests_per_second}`);
    console.log(`Queue Length: ${queue_length}`);
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
