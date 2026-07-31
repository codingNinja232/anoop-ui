import data from "./pressure-data.json";

export interface PressurePoint {
  /** Distance along the coronary artery from the ostium, in mm. */
  position: number;
  /** Intraluminal blood pressure at this position, in mmHg. */
  pressure: number;
}

export interface Blockage {
  /** Highlighted segment along the artery, in mm. */
  startMm: number;
  endMm: number;
  /** Instantaneous pressure lost at this lesion, in mmHg. */
  dropMmHg: number;
}

export const ARTERIAL_LENGTH_MM = data.arterialLengthMm;
export const PROXIMAL_PRESSURE = data.proximalPressure;
export const BLOCKAGES: Blockage[] = data.blockages;
export const PRESSURE_POINTS: PressurePoint[] = data.points;

export const TOTAL_DROP_MMHG = BLOCKAGES.reduce(
  (total, blockage) => total + blockage.dropMmHg,
  0,
);
