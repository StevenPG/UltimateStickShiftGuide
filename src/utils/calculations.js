/**
 * RPM Calculation Formula:
 * RPM = (Axle Ratio × Vehicle Speed × Transmission Ratio × 336.13) / Tire Diameter
 *
 * Where:
 * - Axle Ratio: Final drive ratio (e.g., 3.73)
 * - Vehicle Speed: Speed in MPH
 * - Transmission Ratio: Gear ratio for current gear
 * - 336.13: Conversion constant (accounts for unit conversions)
 * - Tire Diameter: Tire diameter in inches
 */

export const CONVERSION_CONSTANT = 336.13

/**
 * Calculate RPM based on vehicle parameters
 * @param {Object} params
 * @param {number} params.speed - Vehicle speed in MPH
 * @param {number} params.gearRatio - Current gear's transmission ratio
 * @param {number} params.axleRatio - Final drive/axle ratio
 * @param {number} params.tireDiameter - Tire diameter in inches
 * @returns {number} Calculated RPM
 */
export function calculateRPM({ speed, gearRatio, axleRatio, tireDiameter }) {
  if (tireDiameter <= 0) return 0
  return (axleRatio * speed * gearRatio * CONVERSION_CONSTANT) / tireDiameter
}

/**
 * Get RPM zone based on RPM value
 * @param {number} rpm - Current RPM
 * @param {number} yellowLine - RPM where yellow zone starts (default 4000)
 * @param {number} redLine - RPM where red zone starts (default 5500)
 * @returns {'green' | 'yellow' | 'red'} Zone color
 */
export function getRPMZone(rpm, yellowLine = 4000, redLine = 5500) {
  if (rpm >= redLine) return 'red'
  if (rpm >= yellowLine) return 'yellow'
  return 'green'
}

/**
 * Format RPM for display
 * @param {number} rpm - RPM value
 * @returns {string} Formatted RPM string with thousands separator
 */
export function formatRPM(rpm) {
  return Math.round(rpm).toLocaleString()
}

/**
 * Calculate tire diameter from tire size notation
 * @param {number} width - Tire width in mm (e.g., 225)
 * @param {number} aspectRatio - Aspect ratio percentage (e.g., 60)
 * @param {number} rimDiameter - Rim diameter in inches (e.g., 16)
 * @returns {number} Overall tire diameter in inches
 */
export function calculateTireDiameter(width, aspectRatio, rimDiameter) {
  const sidewallHeight = (width * (aspectRatio / 100)) / 25.4 // Convert mm to inches
  return (sidewallHeight * 2) + rimDiameter
}
