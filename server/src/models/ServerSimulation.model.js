const mongoose = require('mongoose');

const serverSimulationSchema = new mongoose.Schema({
  arrival_rate: {
    type: Number,
    required: true
  },
  request_count: {
    type: Number,
    required: true
  },
  requests_per_second: {
    type: Number,
    required: true
  },
  queue_length: {
    type: Number,
    required: true
  },
  server_utilization: {
    type: Number,
    required: true
  },
  overload_probability: {
    type: Number,
    required: true
  },
  expected_delay: {
    type: Number,
    required: true
  },
  congestion_risk: {
    type: Number,
    required: true
  },
  boost_percentage: {
    type: Number,
    required: true
  },
  cpu_scaling: {
    type: Number,
    required: true
  },
  instance_scaling: {
    type: Number,
    required: true
  },
  auto_scaling_threshold: {
    type: Number,
    required: true
  },
  boost_recommendation: {
    type: String,
    required: true
  },
  poisson_calculation: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ServerSimulation', serverSimulationSchema);
