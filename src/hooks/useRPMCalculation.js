import { useState, useMemo, useCallback, useEffect } from 'react'
import { calculateRPM, getRPMZone, formatRPM } from '../utils/calculations'

const STORAGE_KEY = 'rpm-calculator-state'

const defaultValues = {
  gearCount: 6,
  gearRatios: [3.36, 1.93, 1.29, 1.00, 0.84, 0.56],
  axleRatio: 3.73,
  tireDiameter: 26.7,
}

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

const emptyVehicle = { make: '', model: '', year: '', trim: '' }

export function useRPMCalculation() {
  const stored = loadFromStorage()

  const [gearCount, setGearCount] = useState(stored?.gearCount ?? defaultValues.gearCount)
  const [gearRatios, setGearRatios] = useState(stored?.gearRatios ?? [...defaultValues.gearRatios])
  const [selectedGear, setSelectedGear] = useState(stored?.selectedGear ?? 4)
  const [speed, setSpeed] = useState(stored?.speed ?? 60)
  const [axleRatio, setAxleRatio] = useState(stored?.axleRatio ?? defaultValues.axleRatio)
  const [tireDiameter, setTireDiameter] = useState(stored?.tireDiameter ?? defaultValues.tireDiameter)
  const [isCustomMode, setIsCustomMode] = useState(stored?.isCustomMode ?? true)
  const [selectedVehicle, setSelectedVehicle] = useState(stored?.selectedVehicle ?? emptyVehicle)

  // Persist state to localStorage
  useEffect(() => {
    saveToStorage({
      gearCount,
      gearRatios,
      selectedGear,
      speed,
      axleRatio,
      tireDiameter,
      isCustomMode,
      selectedVehicle,
    })
  }, [gearCount, gearRatios, selectedGear, speed, axleRatio, tireDiameter, isCustomMode, selectedVehicle])

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

  // Switch to custom mode (when user edits fields)
  const switchToCustomMode = useCallback(() => {
    if (!isCustomMode) {
      setIsCustomMode(true)
      setSelectedVehicle(emptyVehicle)
    }
  }, [isCustomMode])

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
    switchToCustomMode()
  }, [selectedGear, switchToCustomMode])

  // Update a single gear ratio
  const updateGearRatio = useCallback((gearIndex, ratio) => {
    setGearRatios(prev => {
      const newRatios = [...prev]
      newRatios[gearIndex] = ratio
      return newRatios
    })
    switchToCustomMode()
  }, [switchToCustomMode])

  // Handle custom mode toggle
  const handleCustomModeChange = useCallback((enabled) => {
    setIsCustomMode(enabled)
    if (enabled) {
      // Keep current values when switching to custom mode
      setSelectedVehicle(emptyVehicle)
    }
  }, [])

  // Handle vehicle selection from database
  const handleVehicleSelect = useCallback((vehicle, calculatorData) => {
    setSelectedVehicle(vehicle)

    // Apply calculator data if provided (when trim is selected)
    if (calculatorData) {
      setGearCount(calculatorData.gearCount)
      setGearRatios([...calculatorData.gearRatios])
      setAxleRatio(calculatorData.axleRatio)
      setTireDiameter(calculatorData.tireDiameter)
      // Reset gear to 4 or max available
      setSelectedGear(Math.min(4, calculatorData.gearCount))
    }
  }, [])

  // Update axle ratio with custom mode switch
  const updateAxleRatio = useCallback((ratio) => {
    setAxleRatio(ratio)
    switchToCustomMode()
  }, [switchToCustomMode])

  // Update tire diameter with custom mode switch
  const updateTireDiameter = useCallback((diameter) => {
    setTireDiameter(diameter)
    switchToCustomMode()
  }, [switchToCustomMode])

  return {
    // State
    gearCount,
    gearRatios,
    selectedGear,
    speed,
    axleRatio,
    tireDiameter,
    isCustomMode,
    selectedVehicle,

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
    setAxleRatio: updateAxleRatio,
    setTireDiameter: updateTireDiameter,
    updateGearRatio,
    setCustomMode: handleCustomModeChange,
    selectVehicle: handleVehicleSelect,
  }
}
