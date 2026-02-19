const { RELIABILITY_THRESHOLDS, TRAFFIC_SCALING_FACTORS } = require('../config/constants');

/**
 * Calculate traffic reliability metrics
 * @param {Object} params - Input parameters
 * @returns {Object} - Reliability metrics
 */
const calculateReliabilityMetrics = ({ total_packets, successful_packets, failed_packets }) => {
  const probability = successful_packets / total_packets;
  const reliability_score = probability * 100;
  const packet_loss_probability = 1 - probability;
  const retransmission_estimate = failed_packets * TRAFFIC_SCALING_FACTORS.RETRANSMISSION_MULTIPLIER;

  return {
    probability,
    reliability_score,
    packet_loss_probability,
    retransmission_estimate
  };
};

/**
 * Calculate scaling recommendations for traffic
 * @param {Object} params - Input parameters
 * @returns {Object} - Scaling recommendations
 */
const calculateTrafficScaling = ({ total_packets, reliability_score }) => {
  const trafficGrowthRate = total_packets / TRAFFIC_SCALING_FACTORS.NORMALIZATION_DIVISOR;
  const horizontal_scaling = Math.ceil(trafficGrowthRate * TRAFFIC_SCALING_FACTORS.HORIZONTAL_MULTIPLIER);
  const vertical_scaling = Math.ceil(trafficGrowthRate * TRAFFIC_SCALING_FACTORS.VERTICAL_MULTIPLIER);

  let scaling_recommendation = '';
  
  if (reliability_score >= RELIABILITY_THRESHOLDS.EXCELLENT) {
    scaling_recommendation = 'Excellent performance. No immediate scaling required.';
  } else if (reliability_score >= RELIABILITY_THRESHOLDS.MODERATE) {
    scaling_recommendation = `Moderate load detected. Consider adding ${horizontal_scaling} server(s) or increasing resources by ${vertical_scaling}%.`;
  } else {
    scaling_recommendation = `High load detected! Urgent scaling needed: Add ${horizontal_scaling} server(s) and increase resources by ${vertical_scaling}%.`;
  }

  return {
    horizontal_scaling,
    vertical_scaling,
    scaling_recommendation
  };
};

module.exports = {
  calculateReliabilityMetrics,
  calculateTrafficScaling
};
