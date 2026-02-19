const { SERVER_THRESHOLDS, SCALING_RECOMMENDATIONS, PERFORMANCE_METRICS } = require('../config/constants');

/**
 * Calculate server performance metrics
 * @param {Object} params - Input parameters
 * @returns {Object} - Performance metrics
 */
const calculateServerMetrics = ({ queue_length, server_utilization, request_count }) => {
  const overload_probability = server_utilization > PERFORMANCE_METRICS.OVERLOAD_BASE_THRESHOLD 
    ? (server_utilization - PERFORMANCE_METRICS.OVERLOAD_BASE_THRESHOLD) / 20 
    : 0;
    
  const expected_delay = queue_length * PERFORMANCE_METRICS.QUEUE_DELAY_MULTIPLIER;
  const congestion_risk = (queue_length / (request_count + 1)) * 100;

  return {
    overload_probability,
    expected_delay,
    congestion_risk
  };
};

/**
 * Determine server utilization level
 * @param {number} utilization - Server utilization percentage
 * @returns {string} - Utilization level (CRITICAL, WARNING, MODERATE, or OPTIMAL)
 */
const getUtilizationLevel = (utilization) => {
  if (utilization >= SERVER_THRESHOLDS.CRITICAL) return 'CRITICAL';
  if (utilization >= SERVER_THRESHOLDS.WARNING) return 'WARNING';
  if (utilization >= SERVER_THRESHOLDS.MODERATE) return 'MODERATE';
  return 'OPTIMAL';
};

/**
 * Calculate boost recommendations based on server utilization
 * @param {number} server_utilization - Server utilization percentage
 * @returns {Object} - Boost recommendations
 */
const calculateBoostRecommendations = (server_utilization) => {
  const level = getUtilizationLevel(server_utilization);
  
  if (level === 'OPTIMAL') {
    return {
      boost_percentage: 0,
      cpu_scaling: 0,
      instance_scaling: 0,
      auto_scaling_threshold: 70,
      boost_recommendation: 'Optimal performance. Server running efficiently. No immediate action required.'
    };
  }
  
  const config = SCALING_RECOMMENDATIONS[level];
  
  const recommendations = {
    CRITICAL: `CRITICAL: Server overload detected! Immediate action required:\n- Scale CPU by ${config.CPU_SCALING}%\n- Add ${config.INSTANCE_SCALING} instances\n- Enable auto-scaling at ${config.AUTO_SCALING_THRESHOLD}% threshold`,
    WARNING: `WARNING: High server load. Recommended actions:\n- Scale CPU by ${config.CPU_SCALING}%\n- Add ${config.INSTANCE_SCALING} instances\n- Monitor and set auto-scaling at ${config.AUTO_SCALING_THRESHOLD}%`,
    MODERATE: `MODERATE: Consider performance optimization:\n- Scale CPU by ${config.CPU_SCALING}%\n- Add ${config.INSTANCE_SCALING} instance for redundancy\n- Set auto-scaling threshold at ${config.AUTO_SCALING_THRESHOLD}%`
  };
  
  return {
    boost_percentage: config.BOOST_PERCENTAGE,
    cpu_scaling: config.CPU_SCALING,
    instance_scaling: config.INSTANCE_SCALING,
    auto_scaling_threshold: config.AUTO_SCALING_THRESHOLD,
    boost_recommendation: recommendations[level]
  };
};

/**
 * Calculate lambda for Poisson distribution
 * @param {number} request_count - Number of requests
 * @param {number} server_utilization - Server utilization percentage
 * @returns {number} - Lambda value
 */
const calculateLambda = (request_count, server_utilization) => {
  const success_rate = server_utilization / 100;
  return request_count * success_rate;
};

module.exports = {
  calculateServerMetrics,
  calculateBoostRecommendations,
  calculateLambda,
  getUtilizationLevel
};
