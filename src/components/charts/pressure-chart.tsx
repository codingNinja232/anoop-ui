"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ARTERIAL_LENGTH_MM,
  PRESSURE_POINTS,
  PROXIMAL_PRESSURE,
  type PressurePoint,
} from "@/lib/pressure-data";
import styles from "./pressure-chart.module.css";

interface PressureChartProps {
  onHover: (positionMm: number | null) => void;
}

interface TooltipContentProps {
  active?: boolean;
  payload?: Array<{ payload: PressurePoint }>;
}

function ChartTooltip({ active, payload }: TooltipContentProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }
  const point = payload[0].payload;
  return (
    <div className={styles.tooltip} role="status">
      <span className={styles.tooltipLabel}>Position</span>
      <span className={styles.tooltipValue}>{point.position.toFixed(0)} mm</span>
      <span className={styles.tooltipLabel}>Pressure</span>
      <span className={styles.tooltipValue}>{point.pressure.toFixed(1)} mmHg</span>
    </div>
  );
}

function AxisTick({ x, y, payload }: { x?: number; y?: number; payload?: { value: unknown } }) {
  return (
    <text x={x} y={y} dy={14} textAnchor="middle" className={styles.axisTick}>
      {String(payload?.value)}
    </text>
  );
}

export function PressureChart({ onHover }: PressureChartProps) {
  const handleMouseMove = (nextState: unknown) => {
    const state = nextState as { activeTooltipIndex?: number } | null;
    const index = state?.activeTooltipIndex;
    if (index == null) {
      return;
    }
    const point = PRESSURE_POINTS[Math.max(0, Math.min(PRESSURE_POINTS.length - 1, index))];
    onHover(point.position);
  };

  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={PRESSURE_POINTS}
          margin={{ top: 12, right: 12, bottom: 4, left: 0 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => onHover(null)}
          aria-label="Line chart of blood pressure along the coronary artery, dropping from 100 mmHg to near zero across the blockage."
        >
          <CartesianGrid strokeDasharray="3 6" className={styles.grid} />
          <XAxis
            dataKey="position"
            type="number"
            domain={[0, ARTERIAL_LENGTH_MM]}
            tickCount={6}
            tick={<AxisTick />}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            label={{
              value: "Distance along artery (mm)",
              position: "insideBottom",
              dy: 18,
              className: styles.axisLabel,
            }}
          />
          <YAxis
            domain={[0, PROXIMAL_PRESSURE + 10]}
            tickCount={6}
            tick={<AxisTick />}
            axisLine={false}
            tickLine={false}
            width={44}
            label={{
              value: "Pressure (mmHg)",
              position: "insideLeft",
              angle: -90,
              dx: 28,
              className: styles.axisLabel,
            }}
          />
          <Tooltip content={<ChartTooltip />} />
          <Line
            type="monotone"
            dataKey="pressure"
            className={styles.pressureLine}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, className: styles.activeDot }}
            animationDuration={3200}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
