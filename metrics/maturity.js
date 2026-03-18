// ═════════════════════════════════════════════════════════════
// RELIABILITY: Software Maturity Index (SMI)
// IEEE 982.2 Formula: SMI = (Mt - (Fc + Fa + Fd)) / Mt
// ═════════════════════════════════════════════════════════════

/**
 * Calculate Software Maturity Index using IEEE 982.2 formula
 * @param {number} Mt - Total modules/functions in current release
 * @param {number} Fc - Number of changed modules/functions
 * @param {number} Fa - Number of added modules/functions
 * @param {number} Fd - Number of deleted modules/functions
 * @returns {object} Object with SMI value and interpretation
 */
function calculateSMI(Mt, Fc, Fa, Fd) {
  if (Mt === 0) {
    return {
      SMI: 0,
      interpretation: 'Cannot calculate SMI: no modules defined',
      Mt,
      Fc,
      Fa,
      Fd
    };
  }

  const smi = (Mt - (Fc + Fa + Fd)) / Mt;

  let stability = '';
  if (smi >= 0.95) {
    stability = 'Highly stable release';
  } else if (smi >= 0.85) {
    stability = 'Stable release with minor changes';
  } else if (smi >= 0.70) {
    stability = 'Moderate release with controlled changes';
  } else {
    stability = 'Unstable release with significant changes';
  }

  return {
    SMI: parseFloat(smi.toFixed(4)),
    stability,
    Mt,
    Fc,
    Fa,
    Fd,
    changedModulesPercent: parseFloat(((Fc + Fa + Fd) / Mt * 100).toFixed(2))
  };
}

module.exports = { calculateSMI };
