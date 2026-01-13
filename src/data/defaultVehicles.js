/**
 * Default vehicle presets with transmission ratios and vehicle parameters
 * Data sourced from manufacturer specifications
 */

export const vehiclePresets = {
  miata: {
    name: 'Mazda MX-5 Miata (ND)',
    gearCount: 6,
    gearRatios: [3.454, 1.944, 1.310, 1.000, 0.787, 0.645],
    axleRatio: 2.866,
    tireDiameter: 24.3, // 205/45R17
  },
  civicSi: {
    name: 'Honda Civic Si',
    gearCount: 6,
    gearRatios: [3.643, 2.080, 1.361, 1.024, 0.830, 0.686],
    axleRatio: 4.35,
    tireDiameter: 25.7, // 235/40R18
  },
  mustangGT: {
    name: 'Ford Mustang GT',
    gearCount: 6,
    gearRatios: [3.36, 1.93, 1.29, 1.00, 0.84, 0.56],
    axleRatio: 3.73,
    tireDiameter: 26.7, // 255/40R19
  },
  wrx: {
    name: 'Subaru WRX',
    gearCount: 6,
    gearRatios: [3.454, 1.947, 1.366, 0.972, 0.738, 0.666],
    axleRatio: 3.90,
    tireDiameter: 25.7, // 245/40R18
  },
  corvette: {
    name: 'Chevrolet Corvette (C7)',
    gearCount: 7,
    gearRatios: [2.97, 2.07, 1.43, 1.00, 0.84, 0.57, 0.50],
    axleRatio: 3.42,
    tireDiameter: 27.4, // 285/30R20
  },
  porsche911: {
    name: 'Porsche 911 Carrera',
    gearCount: 6,
    gearRatios: [3.91, 2.29, 1.55, 1.13, 0.87, 0.68],
    axleRatio: 3.44,
    tireDiameter: 26.2, // 295/35R19
  },
  gr86: {
    name: 'Toyota GR86 / Subaru BRZ',
    gearCount: 6,
    gearRatios: [3.626, 2.188, 1.541, 1.213, 1.000, 0.767],
    axleRatio: 4.10,
    tireDiameter: 25.1, // 215/40R18
  },
  semiTruck: {
    name: 'Semi-Truck (10-speed)',
    gearCount: 10,
    gearRatios: [12.29, 8.56, 6.06, 4.38, 3.20, 2.29, 1.52, 1.00, 0.74, 0.64],
    axleRatio: 3.70,
    tireDiameter: 42.0, // 295/75R22.5
  },
  custom: {
    name: 'Custom',
    gearCount: 6,
    gearRatios: [3.36, 1.93, 1.29, 1.00, 0.84, 0.56],
    axleRatio: 3.73,
    tireDiameter: 26.7,
  },
}

export const defaultVehicle = vehiclePresets.mustangGT

/**
 * Common axle ratios for reference
 */
export const commonAxleRatios = [
  { ratio: 3.08, description: 'Highway economy' },
  { ratio: 3.31, description: 'Balanced' },
  { ratio: 3.55, description: 'Performance' },
  { ratio: 3.73, description: 'Performance/Towing' },
  { ratio: 4.10, description: 'Acceleration' },
]

/**
 * Common tire size to diameter conversions
 */
export const commonTireSizes = [
  { size: 'P205/55R16', diameter: 24.9 },
  { size: 'P225/60R16', diameter: 26.7 },
  { size: 'P235/40R18', diameter: 25.4 },
  { size: 'P245/40R18', diameter: 25.7 },
  { size: 'P255/40R19', diameter: 27.0 },
  { size: 'P275/40R20', diameter: 28.7 },
]
