import { useEffect, useCallback } from 'react'

export default function GearSelector({ gearCount, selectedGear, onGearChange }) {
  // Handle keyboard shortcuts (1-9, 0 for 10th gear)
  const handleKeyDown = useCallback((e) => {
    const key = e.key
    if (key >= '1' && key <= '9') {
      const gear = parseInt(key)
      if (gear <= gearCount) {
        onGearChange(gear)
      }
    } else if (key === '0' && gearCount >= 10) {
      onGearChange(10)
    }
  }, [gearCount, onGearChange])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Generate gear buttons based on gear count
  const gears = Array.from({ length: gearCount }, (_, i) => i + 1)

  // Determine grid layout based on gear count
  const gridCols = gearCount <= 5 ? 'grid-cols-5' : 'grid-cols-5'

  return (
    <div className="space-y-2">
      <div className={`grid ${gridCols} gap-2`}>
        {gears.map(gear => (
          <button
            key={gear}
            onClick={() => onGearChange(gear)}
            className={`btn-gear ${selectedGear === gear ? 'active' : ''}`}
            title={`Gear ${gear} (press ${gear === 10 ? '0' : gear})`}
          >
            {gear}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Press 1-{gearCount === 10 ? '0' : gearCount} to select gear
      </p>
    </div>
  )
}
