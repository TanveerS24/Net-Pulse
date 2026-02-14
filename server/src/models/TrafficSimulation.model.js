const mongoose = require('mongoose');

const trafficSimulationSchema = new mongoose.Schema({
  total_packets: {
    type: Number,
    required: true
  },
  successful_packets: {
    type: Number,
    required: true
  },
  failed_packets: {
    type: Number,
    required: true
  },
  probability: {
    type: Number,
    required: true
  },
  reliability_score: {
    type: Number,
    required: true
  },
  packet_loss_probability: {
    type: Number,
    required: true
  },
  retransmission_estimate: {
    type: Number,
    required: true
  },
  horizontal_scaling: {
    type: Number,
    required: true
  },
  vertical_scaling: {
    type: Number,
    required: true
  },
  scaling_recommendation: {
    type: String,
    required: true
  },
  binomial_calculation: {
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

module.exports = mongoose.model('TrafficSimulation', trafficSimulationSchema);
