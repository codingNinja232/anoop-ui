"use client";

import { useState, type ReactNode } from "react";
import { HeartDiagram } from "@/components/charts/heart-diagram";
import { PressureChart } from "@/components/charts/pressure-chart";
import { BLOCKAGES } from "@/lib/pressure-data";
import styles from "./pressure-visualization.module.css";

interface PressureVisualizationProps {
  ffr: ReactNode;
  infoColumns: ReactNode;
}

export function PressureVisualization({
  ffr,
  infoColumns,
}: PressureVisualizationProps) {
  const [hoverPositionMm, setHoverPositionMm] = useState<number | null>(null);
  const blockageActive =
    hoverPositionMm != null &&
    BLOCKAGES.some(
      (blockage) =>
        hoverPositionMm >= blockage.startMm && hoverPositionMm <= blockage.endMm,
    );

  return (
    <section
      className={styles.section}
      aria-label="Interactive pressure visualization"
    >
      <div className={styles.imageCard}>
        <div className={styles.panelTitle}>
          <span className={styles.panelTitleText}>Artery map</span>
          <span className={styles.panelTitleHint}>hover the chart to trace</span>
        </div>
        <div className={styles.heartDiagramWrap}>
          <HeartDiagram hoverPositionMm={hoverPositionMm} />
        </div>
        <div className={styles.heartLabels} aria-hidden="true">
          <span className={styles.proximalLabel}>proximal · ~100 mmHg</span>
          <span className={styles.blockageLabel}>blockage</span>
          <span className={styles.distalLabel}>distal · ~0 mmHg</span>
        </div>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.chartPanel}>
          <div className={styles.panelTitle}>
            <span className={styles.panelTitleText}>
              Pressure along the artery
            </span>
            <span
              className={styles.statusBadge}
              data-blockage-active={blockageActive || undefined}
            >
              {blockageActive ? "in blockage zone" : "tracking flow"}
            </span>
          </div>
          <div className={styles.chartWrap}>
            <PressureChart onHover={setHoverPositionMm} />
          </div>
        </div>
        {ffr}
        {infoColumns}
      </div>
    </section>
  );
}
