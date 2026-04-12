// ═════════════════════════════════════════════════════════════════════════════
// Software Reliability Models and Metrics — Chapter 9 (B.H. Far, SENG 421)
// ═════════════════════════════════════════════════════════════════════════════
// Implements exponential failure models, reliability growth models, and
// release criteria based on classical and Poisson-based reliability theory.
// ═════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// LIVE TRACKING STATE — Updated by server.js at runtime
// ─────────────────────────────────────────────────────────────────────────────
const reliabilityState = {
  totalRequests: 0,
  failedRequests: 0,
  faultToleranceRate: 100,
  sessionStartTime: Date.now(),
  failureTimes: [],           // Array of timestamps when failures occurred
  interFailureTimes: [],      // Array of gaps between consecutive failures (ms)
  laplaceFactor: null,        // Computed Laplace factor for reliability trend
  reliabilityTrend: 'stable'  // "growth", "stable", or "decrease"
};

// ─────────────────────────────────────────────────────────────────────────────
// ROUND HELPER
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Rounds a number to 4 decimal places
 * @param {number} value - The value to round
 * @returns {number} Rounded value
 */
function round(value) {
  return Math.round(value * 10000) / 10000;
}

// ═════════════════════════════════════════════════════════════════════════════
// 1. BASIC RELIABILITY METRICS (Single Failure — Exponential Distribution)
// ═════════════════════════════════════════════════════════════════════════════

/**
 * Exponential Probability Density Function
 * Formula: f(t) = lambda * e^(-lambda*t)
 * @param {number} lambda - Failure rate (failures per unit time)
 * @param {number} t - Time
 * @returns {number} PDF value at time t (rounded to 4 decimals)
 */
function getPDF(lambda, t) {
  if (lambda <= 0 || t < 0) return 0;
  const result = lambda * Math.exp(-lambda * t);
  return round(result);
}

/**
 * Cumulative Distribution Function
 * Formula: F(t) = 1 - e^(-lambda*t)
 * Represents the probability of failure by time t
 * @param {number} lambda - Failure rate (failures per unit time)
 * @param {number} t - Time
 * @returns {number} Cumulative probability (rounded to 4 decimals)
 */
function getCDF(lambda, t) {
  if (lambda <= 0 || t < 0) return 0;
  const result = 1 - Math.exp(-lambda * t);
  return round(result);
}

/**
 * Reliability Function (Survival Function)
 * Formula: R(t) = e^(-lambda*t)
 * Represents the probability that the system survives beyond time t
 * @param {number} lambda - Failure rate (failures per unit time)
 * @param {number} t - Time
 * @returns {number} Reliability value (0 to 1, rounded to 4 decimals)
 */
function getReliability(lambda, t) {
  if (lambda <= 0 || t < 0) return 1;
  const result = Math.exp(-lambda * t);
  return round(result);
}

/**
 * Mean Time To Failure (MTTF)
 * Formula: MTTF = 1 / lambda
 * Expected time until first failure
 * @param {number} lambda - Failure rate (failures per unit time)
 * @returns {number} MTTF in time units (rounded to 4 decimals)
 */
function getMTTF(lambda) {
  if (lambda <= 0) return 0;
  const result = 1 / lambda;
  return round(result);
}

/**
 * Availability Function
 * Formula: A(t) = 1 / (1 + tm * lambda)
 * Represents the proportion of time the system is operational
 * @param {number} lambda - Failure rate (failures per unit time)
 * @param {number} tm - Mean repair time
 * @returns {number} Availability value (0 to 1, rounded to 4 decimals)
 */
function getAvailability(lambda, tm) {
  if (lambda <= 0 || tm < 0) return 1;
  const result = 1 / (1 + tm * lambda);
  return round(result);
}

/**
 * Hazard Rate (Failure Rate Function)
 * Formula: z(t) = lambda (constant for exponential distribution)
 * Represents the conditional probability of failure in the next unit time
 * @param {number} lambda - Failure rate (failures per unit time)
 * @returns {number} Hazard rate (same as lambda, rounded to 4 decimals)
 */
function getHazardRate(lambda) {
  if (lambda <= 0) return 0;
  return round(lambda);
}

// ═════════════════════════════════════════════════════════════════════════════
// 2. RELIABILITY GROWTH MODELS (Multiple Failure — Testing Phase)
// ═════════════════════════════════════════════════════════════════════════════

/**
 * Basic Exponential Failure Intensity Model
 * Formula: lambda(tau) = lambda0 * e^(-(lambda0/v0)*tau)
 * Models failure rate as it decreases through testing
 * @param {number} lambda0 - Initial failure intensity
 * @param {number} v0 - Total failures to be detected
 * @param {number} tau - Testing time
 * @returns {number} Failure intensity at tau (rounded to 4 decimals)
 */
function getFailureIntensityBasic(lambda0, v0, tau) {
  if (lambda0 <= 0 || v0 <= 0 || tau < 0) return 0;
  const exponent = -(lambda0 / v0) * tau;
  const result = lambda0 * Math.exp(exponent);
  return round(result);
}

/**
 * Logarithmic Poisson Failure Intensity Model
 * Formula: lambda(tau) = lambda0 / (lambda0 * theta * tau + 1)
 * Alternative growth model for nonhomogeneous Poisson process
 * @param {number} lambda0 - Initial failure intensity
 * @param {number} theta - Decrease parameter (0 < theta < 1)
 * @param {number} tau - Testing time
 * @returns {number} Failure intensity at tau (rounded to 4 decimals)
 */
function getFailureIntensityPoisson(lambda0, theta, tau) {
  if (lambda0 <= 0 || theta <= 0 || tau < 0) return 0;
  const denominator = lambda0 * theta * tau + 1;
  if (denominator === 0) return 0;
  const result = lambda0 / denominator;
  return round(result);
}

/**
 * Mean Cumulative Failures — Basic Exponential Model
 * Formula: mu(tau) = v0 * [1 - e^(-(lambda0/v0)*tau)]
 * Expected cumulative failures by time tau
 * @param {number} lambda0 - Initial failure intensity
 * @param {number} v0 - Total failures to be detected
 * @param {number} tau - Testing time
 * @returns {number} Mean cumulative failures (rounded to 4 decimals)
 */
function getMeanFailuresBasic(lambda0, v0, tau) {
  if (lambda0 <= 0 || v0 <= 0 || tau < 0) return 0;
  const exponent = -(lambda0 / v0) * tau;
  const result = v0 * (1 - Math.exp(exponent));
  return round(result);
}

/**
 * Mean Cumulative Failures — Logarithmic Poisson Model
 * Formula: mu(tau) = (1/theta) * ln(lambda0 * theta * tau + 1)
 * Expected cumulative failures by time tau
 * @param {number} lambda0 - Initial failure intensity
 * @param {number} theta - Decrease parameter (0 < theta < 1)
 * @param {number} tau - Testing time
 * @returns {number} Mean cumulative failures (rounded to 4 decimals)
 */
function getMeanFailuresPoisson(lambda0, theta, tau) {
  if (lambda0 <= 0 || theta <= 0 || tau < 0) return 0;
  const argument = lambda0 * theta * tau + 1;
  if (argument <= 0) return 0;
  const result = (1 / theta) * Math.log(argument);
  return round(result);
}

/**
 * Failure Intensity from Mean Failures — Basic Model
 * Formula: lambda(mu) = lambda0 * (1 - mu/v0)
 * Inverse of getMeanFailuresBasic; expresses lambda as function of mu
 * @param {number} lambda0 - Initial failure intensity
 * @param {number} v0 - Total failures to be detected
 * @param {number} mu - Mean cumulative failures
 * @returns {number} Failure intensity (rounded to 4 decimals)
 */
function getFailureIntensityFromMuBasic(lambda0, v0, mu) {
  if (lambda0 <= 0 || v0 <= 0 || mu < 0) return 0;
  if (mu >= v0) return 0; // Cannot exceed total failures
  const result = lambda0 * (1 - mu / v0);
  return round(result);
}

/**
 * Failure Intensity from Mean Failures — Poisson Model
 * Formula: lambda(mu) = lambda0 * e^(-theta*mu)
 * Inverse of getMeanFailuresPoisson; expresses lambda as function of mu
 * @param {number} lambda0 - Initial failure intensity
 * @param {number} theta - Decrease parameter (0 < theta < 1)
 * @param {number} mu - Mean cumulative failures
 * @returns {number} Failure intensity (rounded to 4 decimals)
 */
function getFailureIntensityFromMuPoisson(lambda0, theta, mu) {
  if (lambda0 <= 0 || theta <= 0 || mu < 0) return 0;
  const exponent = -theta * mu;
  const result = lambda0 * Math.exp(exponent);
  return round(result);
}

// ═════════════════════════════════════════════════════════════════════════════
// 3. RELEASE CRITERIA (Additional Testing Time Needed)
// ═════════════════════════════════════════════════════════════════════════════

/**
 * Additional Testing Time Required — Basic Exponential Model
 * Formula: Delta_tau = (v0/lambda0) * ln(lambdaP/lambdaF)
 * Calculates additional testing time to go from current failure intensity
 * (lambdaP) to desired target failure intensity (lambdaF)
 * @param {number} v0 - Total failures to be detected
 * @param {number} lambda0 - Initial failure intensity
 * @param {number} lambdaP - Present failure intensity
 * @param {number} lambdaF - Final (desired) failure intensity
 * @returns {number} Additional testing time (rounded to 4 decimals)
 */
function getAdditionalTestTimeBasic(v0, lambda0, lambdaP, lambdaF) {
  if (v0 <= 0 || lambda0 <= 0 || lambdaP <= 0 || lambdaF <= 0) return 0;
  if (lambdaF >= lambdaP) return 0; // Already at or below target
  const ratio = lambdaP / lambdaF;
  if (ratio <= 0) return 0;
  const result = (v0 / lambda0) * Math.log(ratio);
  return round(result);
}

/**
 * Additional Testing Time Required — Logarithmic Poisson Model
 * Formula: Delta_tau = (1/theta) * (1/lambdaF - 1/lambdaP)
 * Calculates additional testing time needed to reach target failure intensity
 * @param {number} theta - Decrease parameter (0 < theta < 1)
 * @param {number} lambdaF - Final (desired) failure intensity
 * @param {number} lambdaP - Present failure intensity
 * @returns {number} Additional testing time (rounded to 4 decimals)
 */
function getAdditionalTestTimePoisson(theta, lambdaF, lambdaP) {
  if (theta <= 0 || lambdaF <= 0 || lambdaP <= 0) return 0;
  if (lambdaF >= lambdaP) return 0; // Already at or below target
  const diff = 1 / lambdaF - 1 / lambdaP;
  if (diff <= 0) return 0;
  const result = (1 / theta) * diff;
  return round(result);
}

// ═════════════════════════════════════════════════════════════════════════════
// 4. MEAN FAILURES EXPERIENCED CALCULATOR
// ═════════════════════════════════════════════════════════════════════════════

/**
 * Mean Failures Experienced (Expected Value)
 * Formula: mu = sum of (i * p_i) where i = failures, p_i = probability
 * Computes expected number of failures from probability distribution
 * @param {Array<{failures: number, probability: number}>} failureProbabilities
 *        Array of objects with 'failures' (count) and 'probability' (0-1)
 * @returns {number} Expected mean failures (rounded to 4 decimals)
 */
function getMeanFailuresExperienced(failureProbabilities) {
  if (!Array.isArray(failureProbabilities) || failureProbabilities.length === 0) {
    return 0;
  }

  let sum = 0;
  for (const item of failureProbabilities) {
    if (typeof item.failures === 'number' && typeof item.probability === 'number') {
      sum += item.failures * item.probability;
    }
  }

  return round(sum);
}

// ═════════════════════════════════════════════════════════════════════════════
// 5. LAPLACE FACTOR & RELIABILITY TREND DETECTION
// ═════════════════════════════════════════════════════════════════════════════

/**
 * Compute Laplace Factor (Arithmetical Mean Laplace Test)
 * Formula: u(i) = {[(1/(i-1)) * sum(partial_sums)] - (total_sum/2)} /
 *                  [total_sum * sqrt(1/(12*(i-1)))]
 * where partial_sums[j] = sum of theta[0..j]
 *
 * Detects reliability growth/degradation trend:
 * u < -2 indicates growth (failures decreasing)
 * -2 ≤ u ≤ 2 indicates stability
 * u > +2 indicates degradation (failures increasing)
 *
 * @param {Array<number>} interFailureTimes - Array of inter-failure times (ms)
 * @returns {object} { laplaceFactor: number, trend: string }
 */
function computeLaplaceFactor(interFailureTimes) {
  // Guard: Need at least 3 inter-failure times
  if (!Array.isArray(interFailureTimes) || interFailureTimes.length < 3) {
    return { laplaceFactor: null, trend: 'stable' };
  }

  const i = interFailureTimes.length;
  let totalSum = 0;

  // Calculate total sum and partial sums
  const partialSums = [];
  let runningSum = 0;
  for (const theta of interFailureTimes) {
    runningSum += theta;
    partialSums.push(runningSum);
    totalSum += theta;
  }

  // Avoid division by zero
  if (totalSum === 0) {
    return { laplaceFactor: null, trend: 'stable' };
  }

  // Compute numerator: (1/(i-1)) * sum(partial_sums) - (total_sum/2)
  const sumOfPartialSums = partialSums.reduce((a, b) => a + b, 0);
  const numerator = (1 / (i - 1)) * sumOfPartialSums - totalSum / 2;

  // Compute denominator: total_sum * sqrt(1/(12*(i-1)))
  const denominator = totalSum * Math.sqrt(1 / (12 * (i - 1)));

  // Avoid division by zero
  if (denominator === 0) {
    return { laplaceFactor: null, trend: 'stable' };
  }

  const laplaceFactor = round(numerator / denominator);

  // Determine trend
  let trend = 'stable';
  if (laplaceFactor < -2) {
    trend = 'growth'; // Failure rate decreasing
  } else if (laplaceFactor > 2) {
    trend = 'decrease'; // Failure rate increasing
  }

  return { laplaceFactor, trend };
}

/**
 * Update the reliability state after a failure is recorded
 * Recalculates interFailureTimes and laplaceFactor
 * @returns {void}
 */
function updateReliabilityTrend() {
  // Only compute if we have at least 2 failures (1 inter-failure time)
  if (reliabilityState.failureTimes.length < 2) {
    reliabilityState.laplaceFactor = null;
    reliabilityState.reliabilityTrend = 'stable';
    reliabilityState.interFailureTimes = [];
    return;
  }

  // Compute inter-failure times
  const interFailureTimes = [];
  for (let i = 1; i < reliabilityState.failureTimes.length; i++) {
    const timeDiff = reliabilityState.failureTimes[i] - reliabilityState.failureTimes[i - 1];
    interFailureTimes.push(timeDiff);
  }

  reliabilityState.interFailureTimes = interFailureTimes;

  // Compute Laplace factor if we have enough data
  if (interFailureTimes.length >= 2) {
    const { laplaceFactor, trend } = computeLaplaceFactor(interFailureTimes);
    reliabilityState.laplaceFactor = laplaceFactor;
    reliabilityState.reliabilityTrend = trend;
  }

  // Update fault tolerance rate
  if (reliabilityState.totalRequests > 0) {
    const succeeded = reliabilityState.totalRequests - reliabilityState.failedRequests;
    reliabilityState.faultToleranceRate = round(
      (succeeded / reliabilityState.totalRequests) * 100
    );
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═════════════════════════════════════════════════════════════════════════════

module.exports = {
  // Live tracking state
  reliabilityState,

  // Basic reliability metrics
  getPDF,
  getCDF,
  getReliability,
  getMTTF,
  getAvailability,
  getHazardRate,

  // Reliability growth models
  getFailureIntensityBasic,
  getFailureIntensityPoisson,
  getMeanFailuresBasic,
  getMeanFailuresPoisson,
  getFailureIntensityFromMuBasic,
  getFailureIntensityFromMuPoisson,

  // Release criteria
  getAdditionalTestTimeBasic,
  getAdditionalTestTimePoisson,

  // Mean failures experienced
  getMeanFailuresExperienced,

  // Trend detection
  computeLaplaceFactor,
  updateReliabilityTrend
};
