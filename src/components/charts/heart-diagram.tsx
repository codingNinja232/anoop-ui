"use client";

import { useEffect, useRef, useState } from "react";
import {
  ARTERIAL_LENGTH_MM,
  BLOCKAGES,
  type Blockage,
} from "@/lib/pressure-data";
import styles from "./heart-diagram.module.css";

const LAD_PATH =
  "M 318 112 C 318 170 306 215 304 258 C 302 292 312 308 322 322";

interface HeartDiagramProps {
  hoverPositionMm: number | null;
}

export function HeartDiagram({ hoverPositionMm }: HeartDiagramProps) {
  const ladRef = useRef<SVGPathElement>(null);
  const [hoverPoint, setHoverPoint] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const path = ladRef.current;
    if (!path || hoverPositionMm == null) {
      setHoverPoint(null);
      return;
    }
    const point = path.getPointAtLength(
      Math.max(0, Math.min(ARTERIAL_LENGTH_MM, hoverPositionMm)),
    );
    setHoverPoint({ x: point.x, y: point.y });
  }, [hoverPositionMm]);

  const blockageStartPct = (blockage: Blockage) =>
    (blockage.startMm / ARTERIAL_LENGTH_MM) * 100;
  const blockageWidthPct = (blockage: Blockage) =>
    ((blockage.endMm - blockage.startMm) / ARTERIAL_LENGTH_MM) * 100;

  return (
    <svg
      className={styles.diagram}
      viewBox="0 0 645 645"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Monochrome 3D render of a human heart and its coronary vessels, with two light-red highlighted blockage segments along the anterior descending artery."
    >
      <defs>
        <filter id="blockageGlow" x="-40%" y="-40%" width="645px" height="645px">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <image
        className={styles.anatomyImage}
        href="/heart-anatomy.jpg"
        x="0"
        y="0"
        width="645"
        height="360"
      preserveAspectRatio="xMidYMin slice"
      />

      {BLOCKAGES.map((blockage) => (
        <path
          key={blockage.startMm}
          className={styles.blockageSegment}
          d={LAD_PATH}
          pathLength={ARTERIAL_LENGTH_MM}
          strokeDasharray={`${blockageWidthPct(blockage)}`}
          strokeDashoffset={`-${blockageStartPct(blockage)}`}
        />
      ))}

      <path
        ref={ladRef}
        d={LAD_PATH}
        pathLength={ARTERIAL_LENGTH_MM}
        className={styles.measureGuide}
      />

      {hoverPoint != null && (
        <circle
          className={styles.hoverMarker}
          cx={hoverPoint.x}
          cy={hoverPoint.y}
          r="5"
        />
      )}
    </svg>
  );
}
