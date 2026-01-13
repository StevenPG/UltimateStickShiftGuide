import { CONVERSION_CONSTANT } from '../../utils/calculations'

export default function CalculationDisplay({
  selectedGear,
  gearRatio,
  speed,
  axleRatio,
  tireDiameter,
  rpm,
  zone,
}) {
  const zoneColors = {
    green: 'text-green-500',
    yellow: 'text-yellow-500',
    red: 'text-red-500',
  }

  const getGearLabel = (gear) => {
    const labels = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th']
    return labels[gear - 1] || `${gear}th`
  }

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Current Calculation
        </h2>
      </div>

      {/* Selected gear display */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-600 dark:text-gray-400">Selected Gear:</span>
        <span className="text-orange-500 font-semibold">
          {getGearLabel(selectedGear)} ({gearRatio.toFixed(2)})
        </span>
      </div>

      {/* Formula display */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 dark:text-gray-400">Formula:</span>
          <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
            [(AR × VS × TR × 336.13) / TD]
          </span>
        </div>

        {/* Formula with values */}
        <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-3 font-mono text-sm">
          <div className="text-gray-600 dark:text-gray-400 mb-1">
            [({axleRatio} × {speed} × {gearRatio.toFixed(2)} × {CONVERSION_CONSTANT}) / {tireDiameter}]
          </div>
          <div className={`text-2xl font-bold ${zoneColors[zone]}`}>
            = {Math.round(rpm).toLocaleString()} RPM
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
        <div className="grid grid-cols-2 gap-2">
          <span>AR = Axle Ratio</span>
          <span>VS = Vehicle Speed</span>
          <span>TR = Transmission Ratio</span>
          <span>TD = Tire Diameter</span>
        </div>
      </div>
    </div>
  )
}
