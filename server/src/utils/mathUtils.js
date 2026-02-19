/**
 * Mathematical utility functions
 */

/**
 * Calculate factorial of a number
 * @param {number} n - The number to calculate factorial for
 * @returns {number} - The factorial of n
 */
const factorial = (n) => {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

/**
 * Calculate binomial coefficient (nCk)
 * Optimized to avoid factorial overflow by canceling terms
 * @param {number} n - Total number of items
 * @param {number} k - Number of items to choose
 * @returns {number} - The binomial coefficient
 */
const binomialCoefficient = (n, k) => {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  
  // Optimize by using the smaller of k and n-k
  k = Math.min(k, n - k);
  
  // Calculate nCk = n * (n-1) * ... * (n-k+1) / (k * (k-1) * ... * 1)
  // This avoids calculating large factorials
  let result = 1;
  for (let i = 0; i < k; i++) {
    result *= (n - i);
    result /= (i + 1);
  }
  return result;
};

/**
 * Safely format a number for display
 * @param {number} value - The value to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted number or fallback text
 */
const safeFormat = (value, decimals = 6) => {
  return isFinite(value) ? value.toFixed(decimals) : 'approximately 0';
};

/**
 * Check if a value is safe for calculations
 * @param {number} value - The value to check
 * @returns {boolean} - True if the value is finite
 */
const isSafeValue = (value) => {
  return isFinite(value) && !isNaN(value);
};

module.exports = {
  factorial,
  binomialCoefficient,
  safeFormat,
  isSafeValue
};
