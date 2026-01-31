import { useState, useEffect, useCallback } from 'react'
import {
  getAvailableMakes,
  loadMakeData,
  getModelsForMake,
  getYearsForModel,
  getTrimsForYear,
  getTrimData,
  extractTrimData,
} from '../../utils/vehicleLoader'

export default function VehicleSelector({
  isCustomMode,
  selectedVehicle,
  onCustomModeChange,
  onVehicleSelect,
}) {
  const [makes, setMakes] = useState([])
  const [makeData, setMakeData] = useState(null)
  const [models, setModels] = useState([])
  const [years, setYears] = useState([])
  const [trims, setTrims] = useState([])
  const [loading, setLoading] = useState(false)

  // Load available makes on mount
  useEffect(() => {
    setMakes(getAvailableMakes())
  }, [])

  // Load make data when make is selected
  useEffect(() => {
    if (!selectedVehicle.make || isCustomMode) {
      setMakeData(null)
      setModels([])
      setYears([])
      setTrims([])
      return
    }

    setLoading(true)
    loadMakeData(selectedVehicle.make)
      .then(data => {
        setMakeData(data)
        setModels(getModelsForMake(data))
      })
      .catch(err => {
        console.error('Failed to load make data:', err)
        setModels([])
      })
      .finally(() => setLoading(false))
  }, [selectedVehicle.make, isCustomMode])

  // Update years when model changes
  useEffect(() => {
    if (!makeData || !selectedVehicle.model) {
      setYears([])
      setTrims([])
      return
    }

    setYears(getYearsForModel(makeData, selectedVehicle.model))
  }, [makeData, selectedVehicle.model])

  // Update trims when year changes
  useEffect(() => {
    if (!makeData || !selectedVehicle.model || !selectedVehicle.year) {
      setTrims([])
      return
    }

    setTrims(getTrimsForYear(makeData, selectedVehicle.model, selectedVehicle.year))
  }, [makeData, selectedVehicle.model, selectedVehicle.year])

  // Load and apply trim data when trim is selected
  useEffect(() => {
    if (!makeData || !selectedVehicle.model || !selectedVehicle.year || !selectedVehicle.trim) {
      return
    }

    const trimData = getTrimData(
      makeData,
      selectedVehicle.model,
      selectedVehicle.year,
      selectedVehicle.trim
    )

    if (trimData) {
      const calculatorData = extractTrimData(trimData)
      onVehicleSelect(selectedVehicle, calculatorData)
    }
  }, [makeData, selectedVehicle.make, selectedVehicle.model, selectedVehicle.year, selectedVehicle.trim])

  const handleMakeChange = useCallback((make) => {
    onVehicleSelect({ make, model: '', year: '', trim: '' }, null)
  }, [onVehicleSelect])

  const handleModelChange = useCallback((model) => {
    onVehicleSelect({ ...selectedVehicle, model, year: '', trim: '' }, null)
  }, [selectedVehicle, onVehicleSelect])

  const handleYearChange = useCallback((year) => {
    onVehicleSelect({ ...selectedVehicle, year: parseInt(year), trim: '' }, null)
  }, [selectedVehicle, onVehicleSelect])

  const handleTrimChange = useCallback((trim) => {
    onVehicleSelect({ ...selectedVehicle, trim }, null)
  }, [selectedVehicle, onVehicleSelect])

  const handleCustomModeToggle = useCallback((e) => {
    onCustomModeChange(e.target.checked)
  }, [onCustomModeChange])

  return (
    <div className="space-y-3">
      {/* Custom mode checkbox */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isCustomMode}
          onChange={handleCustomModeToggle}
          className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
        />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Custom Vehicle
        </span>
      </label>

      {/* Vehicle selection dropdowns - hidden when in custom mode */}
      {!isCustomMode && (
        <div className="grid grid-cols-2 gap-3">
          {/* Make dropdown */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Make
            </label>
            <select
              value={selectedVehicle.make}
              onChange={(e) => handleMakeChange(e.target.value)}
              className="input-field"
              disabled={loading}
            >
              <option value="">Select Make</option>
              {makes.map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
          </div>

          {/* Model dropdown */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Model
            </label>
            <select
              value={selectedVehicle.model}
              onChange={(e) => handleModelChange(e.target.value)}
              className="input-field"
              disabled={!selectedVehicle.make || loading}
            >
              <option value="">Select Model</option>
              {models.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          {/* Year dropdown */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Year
            </label>
            <select
              value={selectedVehicle.year}
              onChange={(e) => handleYearChange(e.target.value)}
              className="input-field"
              disabled={!selectedVehicle.model || loading}
            >
              <option value="">Select Year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Trim dropdown */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Trim
            </label>
            <select
              value={selectedVehicle.trim}
              onChange={(e) => handleTrimChange(e.target.value)}
              className="input-field"
              disabled={!selectedVehicle.year || loading}
            >
              <option value="">Select Trim</option>
              {trims.map(trim => (
                <option key={trim.id} value={trim.name}>
                  {trim.name} ({trim.transmissionType})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <p className="text-xs text-gray-500 dark:text-gray-400">Loading vehicle data...</p>
      )}
    </div>
  )
}
