const { binomialCoefficient, safeFormat, isSafeValue } = require('./mathUtils');

/**
 * Calculate binomial probability distribution
 * @param {number} n - Total number of trials
 * @param {number} k - Number of successful trials
 * @param {number} p - Probability of success on each trial
 * @returns {Object} - Object containing probability and step-by-step calculation
 */
const calculateBinomialProbability = (n, k, p) => {
  try {
    const nCk = binomialCoefficient(n, k);
    const probability = nCk * Math.pow(p, k) * Math.pow(1 - p, n - k);
    
    const safeProbability = isSafeValue(probability) ? probability : 0;
    const calculation = generateBinomialCalculation(n, k, p, nCk, probability);
    
    return { probability: safeProbability, calculation };
  } catch (error) {
    console.error('Error in binomial calculation:', error);
    return { 
      probability: 0, 
      calculation: `Error calculating binomial probability: ${error.message}` 
    };
  }
};

/**
 * Generate step-by-step binomial calculation explanation
 * @param {number} n - Total number of trials
 * @param {number} k - Number of successful trials
 * @param {number} p - Probability of success
 * @param {number} nCk - Binomial coefficient
 * @param {number} probability - Calculated probability
 * @returns {string} - Formatted calculation steps
 */
const generateBinomialCalculation = (n, k, p, nCk, probability) => {
  const safeNck = isFinite(nCk) ? nCk : 'Very large number';
  const safeProbValue = safeFormat(probability, 6);
  const safePercent = isSafeValue(probability) 
    ? (probability * 100).toFixed(4) 
    : '0.0000';
  
  return `
Step 1: Calculate nCk = ${n}C${k}
  nCk = ${n}! / (${k}! × ${n - k}!)
  nCk = ${safeNck}

Step 2: Apply Binomial Formula
  P(X = ${k}) = nCk × p^k × (1-p)^(n-k)
  P(X = ${k}) = ${safeNck} × ${p.toFixed(4)}^${k} × ${(1 - p).toFixed(4)}^${n - k}
  P(X = ${k}) = ${safeProbValue}

Result: ${safePercent}% probability
  `;
};

module.exports = {
  calculateBinomialProbability
};
