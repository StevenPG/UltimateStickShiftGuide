import { useState, useMemo, useCallback, useEffect } from 'react'
import { calculateRPM, getRPMZone, formatRPM } from '../utils/calculations'
import { defaultVehicle, vehiclePresets } from '../data/defaultVehicles'

const STORAGE_KEY = 'rpm-calculator-state'

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.warn('Failed to load state from localStorage:', e)
  }
  return null
}

function saveToStorage(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('Failed to save state to localStorage:', e)
  }
}

export function useRPMCalculation() {
  const stored = loadFromStorage()

  const [gearCount, setGearCount] = useState(stored?.gearCount ?? defaultVehicle.gearCount)
  const [gearRatios, setGearRatios] = useState(stored?.gearRatios ?? [...defaultVehicle.gearRatios])
  const [selectedGear, setSelectedGear] = useState(stored?.selectedGear ?? 4)
  const [speed, setSpeed] = useState(stored?.speed ?? 60)
  const [axleRatio, setAxleRatio] = useState(stored?.axleRatio ?? defaultVehicle.axleRatio)
  const [tireDiameter, setTireDiameter] = useState(stored?.tireDiameter ?? defaultVehicle.tireDiameter)
  const [selectedPreset, setSelectedPreset] = useState(stored?.selectedPreset ?? 'mustangGT')

  // Persist state to localStorage
  useEffect(() => {
    saveToStorage({
      gearCount,
      gearRatios,
      selectedGear,
      speed,
      axleRatio,
      tireDiameter,
      selectedPreset,
    })
  }, [gearCount, gearRatios, selectedGear, speed, axleRatio, tireDiameter, selectedPreset])

  // Current gear ratio (gears are 1-indexed for user, 0-indexed in array)
  const currentGearRatio = gearRatios[selectedGear - 1] ?? 1

  // Calculate RPM
  const rpm = useMemo(() => {
    return calculateRPM({
      speed,
      gearRatio: currentGearRatio,
      axleRatio,
      tireDiameter,
    })
  }, [speed, currentGearRatio, axleRatio, tireDiameter])

  // Get RPM zone
  const rpmZone = useMemo(() => getRPMZone(rpm), [rpm])

  // Formatted RPM for display
  const formattedRPM = useMemo(() => formatRPM(rpm), [rpm])

  // Update gear count and adjust ratios array
  const updateGearCount = useCallback((newCount) => {
    setGearCount(newCount)
    setGearRatios(prev => {
      if (newCount > prev.length) {
        // Add more gears with decreasing ratios
        const newRatios = [...prev]
        for (let i = prev.length; i < newCount; i++) {
          newRatios.push(Math.max(0.3, newRatios[i - 1] - 0.15))
        }
        return newRatios
      } else {
        return prev.slice(0, newCount)
      }
    })
    // Adjust selected gear if out of range
    if (selectedGear > newCount) {
      setSelectedGear(newCount)
    }
    setSelectedPreset('custom')
  }, [selectedGear])

  // Update a single gear ratio
  const updateGearRatio = useCallback((gearIndex, ratio) => {
    setGearRatios(prev => {
      const newRatios = [...prev]
      newRatios[gearIndex] = ratio
      return newRatios
    })
    setSelectedPreset('custom')
  }, [])

  // Load a vehicle preset
  const loadPreset = useCallback((presetKey) => {
    const preset = vehiclePresets[presetKey]
    if (preset) {
      setSelectedPreset(presetKey)
      setGearCount(preset.gearCount)
      setGearRatios([...preset.gearRatios])
      setAxleRatio(preset.axleRatio)
      setTireDiameter(preset.tireDiameter)
      // Reset gear to 4 or max available
      setSelectedGear(Math.min(4, preset.gearCount))
    }
  }, [])

  return {
    // State
    gearCount,
    gearRatios,
    selectedGear,
    speed,
    axleRatio,
    tireDiameter,
    selectedPreset,

    // Computed
    currentGearRatio,
    rpm,
    rpmZone,
    formattedRPM,

    // Actions
    setGearCount: updateGearCount,
    setGearRatios,
    setSelectedGear,
    setSpeed,
    setAxleRatio,
    setTireDiameter,
    updateGearRatio,
    loadPreset,
  }
}
