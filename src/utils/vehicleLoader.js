/**
 * Vehicle data loader utility
 * Loads vehicle data from JSON files and provides filtering/validation
 */

import makesManifest from '../data/makes.json'

// Cache for loaded make data
const makeDataCache = new Map()

/**
 * Validates that a trim has all required data for the calculator
 */
function isValidTrim(trim) {
  // Must have transmission with at least one gear ratio and final_drive
  if (!trim.transmission?.gear_ratios) return false

  const ratios = trim.transmission.gear_ratios
  if (!ratios.final_drive) return false

  // Check for at least one numbered gear
  const hasGear = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th']
    .some(gear => ratios[gear] !== undefined)
  if (!hasGear) return false

  // Must have tire diameter (front or rear)
  const frontDiameter = trim.tires?.front?.diameter_inches
  const rearDiameter = trim.tires?.rear?.diameter_inches
  if (!frontDiameter && !rearDiameter) return false

  return true
}

/**
 * Extracts gear ratios from a trim's transmission data
 */
function extractGearRatios(gearRatiosObj) {
  const gearOrder = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th']
  const ratios = []

  for (const gear of gearOrder) {
    if (gearRatiosObj[gear] !== undefined) {
      ratios.push(parseFloat(gearRatiosObj[gear]))
    } else {
      break // Stop at first missing gear
    }
  }

  return ratios
}

/**
 * Extracts calculator-ready data from a trim
 */
export function extractTrimData(trim) {
  const ratios = trim.transmission.gear_ratios
  const gearRatios = extractGearRatios(ratios)
  const tireDiameter = trim.tires?.front?.diameter_inches || trim.tires?.rear?.diameter_inches

  return {
    gearCount: gearRatios.length,
    gearRatios,
    axleRatio: parseFloat(ratios.final_drive),
    tireDiameter,
    transmissionType: trim.transmission.description || 'Unknown',
  }
}

/**
 * Get list of available makes from the manifest
 */
export function getAvailableMakes() {
  return makesManifest.makes.map(m => m.name).sort()
}

/**
 * Load data for a specific make
 */
export async function loadMakeData(makeName) {
  // Check cache first
  if (makeDataCache.has(makeName)) {
    return makeDataCache.get(makeName)
  }

  // Find the file for this make
  const makeInfo = makesManifest.makes.find(m => m.name === makeName)
  if (!makeInfo) {
    throw new Error(`Make not found: ${makeName}`)
  }

  // Dynamically import the JSON file
  // Remove .json extension from file name for the dynamic import pattern
  const fileName = makeInfo.file.replace('.json', '')
  const module = await import(`../data/${fileName}.json`)
  const data = module.default

  // Filter to only include vehicles with valid trims
  const filteredVehicles = data.vehicles
    .map(vehicle => ({
      ...vehicle,
      trims: vehicle.trims.filter(isValidTrim)
    }))
    .filter(vehicle => vehicle.trims.length > 0)

  const filteredData = {
    ...data,
    vehicles: filteredVehicles,
    vehicle_count: filteredVehicles.length
  }

  // Cache the result
  makeDataCache.set(makeName, filteredData)

  return filteredData
}

/**
 * Get unique models for a make
 */
export function getModelsForMake(makeData) {
  const models = [...new Set(makeData.vehicles.map(v => v.model))]
  return models.sort()
}

/**
 * Get unique years for a make/model combination
 */
export function getYearsForModel(makeData, model) {
  const years = makeData.vehicles
    .filter(v => v.model === model)
    .map(v => v.year)
  return [...new Set(years)].sort((a, b) => b - a) // Descending order (newest first)
}

/**
 * Get trims for a make/model/year combination
 */
export function getTrimsForYear(makeData, model, year) {
  const vehicle = makeData.vehicles.find(v => v.model === model && v.year === year)
  if (!vehicle) return []

  return vehicle.trims.map(trim => ({
    name: trim.trim_name,
    id: trim.trim_id,
    transmissionType: trim.transmission?.description || 'Unknown',
  }))
}

/**
 * Get full trim data for a specific selection
 */
export function getTrimData(makeData, model, year, trimName) {
  const vehicle = makeData.vehicles.find(v => v.model === model && v.year === year)
  if (!vehicle) return null

  const trim = vehicle.trims.find(t => t.trim_name === trimName)
  if (!trim) return null

  return trim
}

/**
 * Clear the cache (useful if data is updated)
 */
export function clearMakeDataCache() {
  makeDataCache.clear()
}
