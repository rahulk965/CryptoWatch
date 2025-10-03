import React, { useEffect, useRef } from 'react'
import { createChart, ColorType, Time } from 'lightweight-charts'

type Props = {
  data: { time: Time; value: number }[]
  height?: number
}

export const PriceChart: React.FC<Props> = ({ data, height = 300 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const chart = createChart(containerRef.current, {
      height,
      layout: { background: { type: ColorType.Solid, color: 'transparent' }, textColor: '#666' },
      grid: { vertLines: { color: '#eee' }, horzLines: { color: '#eee' } },
    })
    const series = chart.addAreaSeries({ lineColor: '#4f46e5', topColor: 'rgba(79,70,229,0.4)', bottomColor: 'rgba(79,70,229,0.05)' })
    series.setData(data)
    chart.timeScale().fitContent()
    chartRef.current = chart
    return () => chart.remove()
  }, [height])

  useEffect(() => {
    // update series data
    // In real usage, keep ref of series to update dynamically
  }, [data])

  return <div ref={containerRef} className="w-full" />
}
export default PriceChart
