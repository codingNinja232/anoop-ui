"use client";

import { useState, type ReactNode } from "react";
import { HeartDiagram } from "@/components/charts/heart-diagram";
import { PressureChart } from "@/components/charts/pressure-chart";
import { BLOCKAGES } from "@/lib/pressure-data";
import styles from "./pressure-visualization.module.css";

interface PressureVisualizationProps {
  rightText: ReactNode;
}

export function PressureVisualization({ rightText }: PressureVisualizationProps) {
  const [hoverPositionMm, setHoverPositionMm] = useState<number | null>(null);
  const blockageActive =
    hoverPositionMm != null &&
    BLOCKAGES.some(
      (blockage) =>
        hoverPositionMm >= blockage.startMm && hoverPositionMm <= blockage.endMm,
    );

  return (
    <section className={styles.section} aria-label="Interactive pressure visualization">
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={`${styles.panel} ${styles.heartPanel}`}>
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
        </div>

        <div className={styles.right}>
          <div className={styles.rightText}>{rightText}</div>

          <div className={styles.pressureSection}>
        <div className={`${styles.panel} ${styles.chartPanel}`}>
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
          <PressureChart onHover={setHoverPositionMm} />
        </div>

        <div className={`${styles.panel} ${styles.infoPanel}`}>
          <div className={styles.panelTitle}>
            <span className={styles.panelTitleText}>What the chart shows</span>
          </div>
          <p className={styles.chartFootnote}>
            Pressure declines steadily from 100 mmHg toward zero, interrupted
            by two sudden drops where plaques narrow the vessel.
          </p>
          <div className={styles.legend} aria-label="Legend">
            <span className={styles.legendItem}>
              <span className={`${styles.swatch} ${styles.swatchHealthy}`} />
              healthy flow
            </span>
            <span className={styles.legendItem}>
              <span className={`${styles.swatch} ${styles.swatchBlocked}`} />
              stenosis
            </span>
            <span className={styles.legendItem}>
              <span className={`${styles.swatch} ${styles.swatchHover}`} />
              hover position
            </span>
          </div>
        </div>
        </div>
      </div>
      </div>
    </section>
  );
}
