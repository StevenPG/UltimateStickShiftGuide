import { useEffect, useRef, useMemo } from 'react'
import * as d3 from 'd3'

const RPM_ZONES = [
  { start: 0, end: 4000, color: '#86efac' },      // Light green
  { start: 4000, end: 5500, color: '#fde047' },   // Yellow
  { start: 5500, end: 9000, color: '#fca5a5' },   // Light red/pink
]

const MAX_RPM = 9000

export default function RPMGauge({ rpm, zone }) {
  const svgRef = useRef(null)
  const needleRef = useRef(null)

  // Clamp RPM to valid range
  const clampedRPM = useMemo(() => Math.min(Math.max(0, rpm), MAX_RPM), [rpm])

  // Convert RPM to angle
  // Gauge spans from -135° (bottom-left, 0 RPM) to +135° (bottom-right, 9000 RPM)
  // This creates a 270° arc going clockwise from 7 o'clock to 5 o'clock
  const rpmToAngle = useMemo(() => {
    return d3.scaleLinear()
      .domain([0, MAX_RPM])
      .range([-135, 135])
  }, [])

  const needleAngle = rpmToAngle(clampedRPM)

  // Initialize the gauge (only once)
  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const width = 300
    const height = 220
    const centerX = width / 2
    const centerY = 160
    const radius = 120
    const arcWidth = 18

    // Create main group centered
    const g = svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${centerX}, ${centerY})`)

    // Arc generator for colored zones
    // D3 arc uses 0 = 12 o'clock, positive = clockwise
    // Our rpmToAngle gives -135° for 0 RPM (bottom-left) and +135° for max (bottom-right)
    const arc = d3.arc()
      .innerRadius(radius - arcWidth)
      .outerRadius(radius)

    // Draw colored zone arcs
    RPM_ZONES.forEach(({ start, end, color }) => {
      const startAngle = (rpmToAngle(start) * Math.PI) / 180
      const endAngle = (rpmToAngle(end) * Math.PI) / 180

      g.append('path')
        .attr('d', arc({ startAngle, endAngle }))
        .attr('fill', color)
    })

    // Draw outer border arc
    const borderArc = d3.arc()
      .innerRadius(radius)
      .outerRadius(radius + 2)
      .startAngle(-135 * Math.PI / 180)
      .endAngle(135 * Math.PI / 180)

    g.append('path')
      .attr('d', borderArc())
      .attr('fill', '#374151')
      .attr('class', 'dark:fill-gray-500')

    // Draw number labels around the outside
    const tickValues = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    const labelRadius = radius + 20

    tickValues.forEach(value => {
      const rpmValue = value * 1000
      const angleDeg = rpmToAngle(rpmValue)
      const angleRad = (angleDeg - 90) * Math.PI / 180
      const x = Math.cos(angleRad) * labelRadius
      const y = Math.sin(angleRad) * labelRadius

      g.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-size', '16px')
        .attr('font-weight', '600')
        .attr('fill', '#374151')
        .attr('class', 'dark:fill-gray-300')
        .text(value)
    })

    // Draw small tick marks between numbers
    for (let i = 0; i <= 80; i += 5) {
      if (i % 10 !== 0) {
        const rpmValue = i * 100
        const angleDeg = rpmToAngle(rpmValue)
        const angleRad = (angleDeg - 90) * Math.PI / 180
        const x1 = Math.cos(angleRad) * (radius + 3)
        const y1 = Math.sin(angleRad) * (radius + 3)
        const x2 = Math.cos(angleRad) * (radius + 8)
        const y2 = Math.sin(angleRad) * (radius + 8)

        g.append('line')
          .attr('x1', x1)
          .attr('y1', y1)
          .attr('x2', x2)
          .attr('y2', y2)
          .attr('stroke', '#9ca3af')
          .attr('stroke-width', 1.5)
      }
    }

    // Draw center pivot circle
    g.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 10)
      .attr('fill', '#374151')
      .attr('stroke', '#1f2937')
      .attr('stroke-width', 2)

    // Create needle group
    const needle = g.append('g')
      .attr('class', 'needle-group')

    // Needle - triangular shape pointing outward
    const needleLength = radius - 25
    needle.append('path')
      .attr('d', `M -3 8 L 0 -${needleLength} L 3 8 Z`)
      .attr('fill', '#dc2626')
      .attr('stroke', '#b91c1c')
      .attr('stroke-width', 1)

    // Small circle at needle base
    needle.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 6)
      .attr('fill', '#1f2937')

    needleRef.current = needle.node()
  }, [rpmToAngle])

  // Update needle position with animation
  useEffect(() => {
    if (needleRef.current) {
      d3.select(needleRef.current)
        .transition()
        .duration(300)
        .ease(d3.easeQuadOut)
        .attr('transform', `rotate(${needleAngle})`)
    }
  }, [needleAngle])

  const zoneColors = {
    green: 'text-green-500',
    yellow: 'text-yellow-500',
    red: 'text-red-500',
  }

  return (
    <div className="flex flex-col items-center relative">
      <svg
        ref={svgRef}
        className="w-full max-w-[300px]"
        style={{ overflow: 'visible' }}
      />

      {/* Digital display - positioned inside the gauge */}
      <div className="absolute" style={{ top: '55%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className="bg-gray-900 dark:bg-black rounded-lg px-4 py-2 border-2 border-gray-700 text-center">
          <div className={`font-mono text-3xl font-bold ${zoneColors[zone]}`}>
            {Math.round(clampedRPM).toLocaleString()}
          </div>
          <div className="text-gray-400 text-xs">RPM</div>
        </div>
      </div>

      {/* Zone legend */}
      <div className="flex gap-4 mt-6 text-sm">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#86efac' }} />
          <span className="text-gray-600 dark:text-gray-400">0-4k</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#fde047' }} />
          <span className="text-gray-600 dark:text-gray-400">4-5.5k</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#fca5a5' }} />
          <span className="text-gray-600 dark:text-gray-400">5.5k+</span>
        </div>
      </div>
    </div>
  )
}
