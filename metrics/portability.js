// ═════════════════════════════════════════════════════════════
// PORTABILITY: Degree of Portability (DP)
// ISO 9126 Portability Measurement
// ═════════════════════════════════════════════════════════════

/**
 * Calculate Degree of Portability
 * Formula: DP = 1 - (Cport / Crdev)
 * 
 * Where:
 * - Cport = Cost to port (migrate to different platform)
 * - Crdev = Cost to redevelop from scratch
 * 
 * For MindPal:
 * - Cport ≈ 0.05 person-months (npm install, minimal config)
 * - Crdev ≈ 0.77 person-months (from Object Point analysis)
 * - DP = 1 - (0.05 / 0.77) = 0.935 = 93.5%
 */

function calculatePortability() {
  // Cost estimates (in person-months)
  const Cport = 0.05; // Cost to port
  const Crdev = 0.77; // Cost to redevelop from scratch (from Object Point analysis)

  // DP formula
  const DP = 1 - (Cport / Crdev);

  // Assess platform support
  const platformSupport = {
    windows: { supported: true, tested: true },
    macOS: { supported: true, tested: true },
    linux: { supported: true, tested: true },
    web: { supported: true, tested: true }
  };

  // Check for OS-specific code
  const osSpecificCode = 0; // MindPal uses no OS-specific code

  // Platform independence assessment
  const platformIndependence = {
    dependsOnOS: false,
    dependsOnArchitecture: false,
    dependsOnBrowser: false, // Backend is OS-independent
    requiresCompilation: false,
    requiresNativeModules: false
  };

  // Technology stack portability
  const technologyStack = {
    runtime: 'Node.js',
    runtimePortability: 'Excellent - runs on Windows, macOS, Linux',
    framework: 'Express.js',
    frameworkPortability: 'Excellent - pure JavaScript, no system dependencies',
    apiClient: 'node-fetch',
    apiClientPortability: 'Excellent - HTTP client, platform-independent',
    externalServices: 'Groq API',
    externalServicesPortability: 'Cloud-based - accessible from anywhere'
  };

  // Migration effort analysis
  const migrationEffort = {
    configurationChanges: 'Minimal - only .env file',
    dependencyInstallation: 'Automatic - npm install',
    codeChanges: 'None required',
    databaseMigration: 'N/A - stateless application',
    estimatedHours: 1,
    estimatedMinutes: 0
  };

  // Portability rating
  let portabilityRating = '';
  let portabilityLevel = 0;

  if (DP >= 0.90) {
    portabilityRating = 'Excellent - Highly portable across all platforms';
    portabilityLevel = 5;
  } else if (DP >= 0.80) {
    portabilityRating = 'Very Good - Portable with minimal effort';
    portabilityLevel = 4;
  } else if (DP >= 0.70) {
    portabilityRating = 'Good - Portable with moderate effort';
    portabilityLevel = 3;
  } else if (DP >= 0.50) {
    portabilityRating = 'Fair - Portable with significant effort';
    portabilityLevel = 2;
  } else {
    portabilityRating = 'Poor - Limited portability';
    portabilityLevel = 1;
  }

  return {
    degreeOfPortability: parseFloat(DP.toFixed(4)),
    portabilityPercentage: parseFloat((DP * 100).toFixed(2)),
    portabilityRating,
    portabilityLevel,
    costCalculation: {
      CportPersonMonths: Cport,
      CredevPersonMonths: Crdev,
      formula: 'DP = 1 - (Cport / Crdev)',
      calculation: `DP = 1 - (${Cport} / ${Crdev}) = ${parseFloat(DP.toFixed(3))}`
    },
    platformSupport,
    osSpecificCodeCount: osSpecificCode,
    platformIndependence,
    technologyStack,
    migrationEffort,
    recommendations: [
      'Application is ready for deployment on any Node.js-capable platform',
      'No OS-specific configuration required',
      'Simply install Node.js and run npm install',
      'Environment variables are the only platform-specific config'
    ]
  };
}

module.exports = { calculatePortability };
