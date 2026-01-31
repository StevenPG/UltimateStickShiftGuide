import RPMGauge from './RPMGauge'
import GearSelector from './GearSelector'
import TransmissionRatios from './TransmissionRatios'
import VehicleParameters from './VehicleParameters'
import CalculationDisplay from './CalculationDisplay'
import { useRPMCalculation } from '../../hooks/useRPMCalculation'

export default function SimulatorPanel() {
  const {
    gearCount,
    gearRatios,
    selectedGear,
    speed,
    axleRatio,
    tireDiameter,
    isCustomMode,
    selectedVehicle,
    currentGearRatio,
    rpm,
    rpmZone,
    setGearCount,
    setSelectedGear,
    setSpeed,
    setAxleRatio,
    setTireDiameter,
    updateGearRatio,
    setCustomMode,
    selectVehicle,
  } = useRPMCalculation()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left column - Inputs */}
      <div className="space-y-6">
        <TransmissionRatios
          gearCount={gearCount}
          gearRatios={gearRatios}
          isCustomMode={isCustomMode}
          selectedVehicle={selectedVehicle}
          onGearCountChange={setGearCount}
          onGearRatioChange={updateGearRatio}
          onCustomModeChange={setCustomMode}
          onVehicleSelect={selectVehicle}
        />

        <VehicleParameters
          speed={speed}
          axleRatio={axleRatio}
          tireDiameter={tireDiameter}
          onSpeedChange={setSpeed}
          onAxleRatioChange={setAxleRatio}
          onTireDiameterChange={setTireDiameter}
        />
      </div>

      {/* Right column - Gauge and results */}
      <div className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">
            RPM Simulation
          </h2>

          <RPMGauge rpm={rpm} zone={rpmZone} />

          <div className="mt-8">
            <GearSelector
              gearCount={gearCount}
              selectedGear={selectedGear}
              onGearChange={setSelectedGear}
            />
          </div>
        </div>

        <CalculationDisplay
          selectedGear={selectedGear}
          gearRatio={currentGearRatio}
          speed={speed}
          axleRatio={axleRatio}
          tireDiameter={tireDiameter}
          rpm={rpm}
          zone={rpmZone}
        />
      </div>
    </div>
  )
}
