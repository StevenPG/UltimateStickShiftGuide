import { commonAxleRatios, commonTireSizes } from '../../data/defaultVehicles'

export default function VehicleParameters({
  speed,
  axleRatio,
  tireDiameter,
  onSpeedChange,
  onAxleRatioChange,
  onTireDiameterChange,
}) {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Vehicle Parameters
        </h2>
      </div>

      {/* Speed slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Vehicle Speed (MPH)
          </label>
          <span className="text-lg font-bold text-orange-500">
            {speed} MPH
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="120"
          value={speed}
          onChange={(e) => onSpeedChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>0</span>
          <span>60</span>
          <span>120</span>
        </div>
      </div>

      {/* Axle ratio input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Axle Gear Ratio
        </label>
        <input
          type="number"
          value={axleRatio}
          onChange={(e) => onAxleRatioChange(parseFloat(e.target.value) || 0)}
          step="0.01"
          min="2"
          max="5"
          className="input-field font-mono"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Common ratios: {commonAxleRatios.map(r => r.ratio).join(', ')}
        </p>
      </div>

      {/* Tire diameter input */}
      <div>
        <div className="flex items-center gap-1 mb-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Tire Diameter (inches)
          </label>
          <button
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            title="Overall tire diameter in inches. You can calculate this from tire size (e.g., P225/60R16 ≈ 26.7&quot;)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <input
          type="number"
          value={tireDiameter}
          onChange={(e) => onTireDiameterChange(parseFloat(e.target.value) || 0)}
          step="0.1"
          min="20"
          max="45"
          className="input-field font-mono"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          P225/60R16 ≈ 26.7", P245/70R17 ≈ 29.5"
        </p>
      </div>
    </div>
  )
}
