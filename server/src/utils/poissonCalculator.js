const { factorial } = require('./mathUtils');

/**
 * Calculate Poisson probability distribution
 * @param {number} lambda - The arrival rate (average number of events)
 * @param {number} k - The number of events
 * @returns {Object} - Object containing probability and step-by-step calculation
 */
const calculatePoissonProbability = (lambda, k) => {
  const e = Math.E;
  const probability = (Math.pow(lambda, k) * Math.pow(e, -lambda)) / factorial(k);
  
  const calculation = generatePoissonCalculation(lambda, k, probability);
  
  return { probability, calculation };
};

/**
 * Generate step-by-step Poisson calculation explanation
 * @param {number} lambda - The arrival rate
 * @param {number} k - The number of events
 * @param {number} probability - The calculated probability
 * @returns {string} - Formatted calculation steps
 */
const generatePoissonCalculation = (lambda, k, probability) => {
  const e = Math.E;
  const lambdaPowK = Math.pow(lambda, k);
  const eNegLambda = Math.pow(e, -lambda);
  const kFactorial = factorial(k);
  
  return `
Step 1: Identify Parameters
  λ (lambda) = ${lambda.toFixed(4)} (arrival rate)
  k = ${k} (number of events)
  e = ${e.toFixed(6)} (Euler's number)

Step 2: Calculate λ^k
  λ^k = ${lambda.toFixed(4)}^${k}
  λ^k = ${lambdaPowK.toFixed(6)}

Step 3: Calculate e^(-λ)
  e^(-λ) = ${e.toFixed(6)}^(-${lambda.toFixed(4)})
  e^(-λ) = ${eNegLambda.toFixed(6)}

Step 4: Calculate k!
  k! = ${k}!
  k! = ${kFactorial}

Step 5: Apply Poisson Formula
  P(X = ${k}) = (λ^k × e^(-λ)) / k!
  P(X = ${k}) = (${lambdaPowK.toFixed(6)} × ${eNegLambda.toFixed(6)}) / ${kFactorial}
  P(X = ${k}) = ${(lambdaPowK * eNegLambda).toFixed(8)} / ${kFactorial}
  P(X = ${k}) = ${probability.toFixed(8)}

Result: ${(probability * 100).toFixed(6)}% probability
  `;
};

module.exports = {
  calculatePoissonProbability
};
