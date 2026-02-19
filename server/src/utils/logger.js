const { CONSOLE_FORMATTING } = require('../config/constants');

/**
 * Format and log server simulation statistics to console
 * @param {Object} data - Simulation data
 */
const logServerStats = (data) => {
  const { arrival_rate, requests_per_second, queue_length } = data;
  const separator = CONSOLE_FORMATTING.SEPARATOR_CHAR.repeat(CONSOLE_FORMATTING.SEPARATOR_LENGTH);
  
  console.log('\n' + separator);
  console.log('SERVER SIMULATION SAVED');
  console.log(separator);
  console.log(`Arrival Rate: ${arrival_rate.toFixed(2)} req/sec`);
  console.log(`Requests/Second: ${requests_per_second}`);
  console.log(`Queue Length: ${queue_length}`);
  console.log(separator + '\n');
};

/**
 * Format and log traffic simulation statistics to console
 * @param {Object} data - Simulation data
 */
const logTrafficStats = (data) => {
  const { total_packets, successful_packets, failed_packets, reliability_score, packet_loss_probability } = data;
  const separator = CONSOLE_FORMATTING.SEPARATOR_CHAR.repeat(CONSOLE_FORMATTING.SEPARATOR_LENGTH);
  
  console.log('\n' + separator);
  console.log('TRAFFIC SIMULATION SAVED');
  console.log(separator);
  console.log(`Total Packets: ${total_packets.toLocaleString()}`);
  console.log(`Successful: ${successful_packets.toLocaleString()} (${reliability_score.toFixed(2)}%)`);
  console.log(`Failed: ${failed_packets.toLocaleString()} (${(packet_loss_probability * 100).toFixed(2)}%)`);
  console.log(separator + '\n');
};

module.exports = {
  logServerStats,
  logTrafficStats
};
