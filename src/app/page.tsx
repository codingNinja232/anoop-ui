import { PressureVisualization } from "@/components/pressure-visualization";
import styles from "./page.module.css";

const TABS = ["Overview", "Anatomy", "Flow", "Pressure", "Report"];

const INFO_COLUMNS = [
  { main: "100 mmHg", body: "upstream pressure" },
  { main: "50%", body: "pressure lost at lesions" },
  { main: "2", body: "lesions along the artery" },
  { main: "0 mmHg", body: "distal pressure" },
];

const NAV_ICONS = [
  { label: "Home", d: "M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" },
  { label: "Pulse", d: "M2 12h5l3-8 4 16 3-8h5" },
  { label: "Heart", d: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" },
  { label: "Layers", d: "m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5" },
  { label: "Settings", d: "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <nav className={styles.rail} aria-label="Primary navigation">
        {NAV_ICONS.map((icon) => (
          <button className={styles.railIcon} type="button" aria-label={icon.label} key={icon.label}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={icon.d} />
            </svg>
          </button>
        ))}
      </nav>

      <div className={styles.main}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Coronary hemodynamics</p>
          <h1 className={styles.title}>Visualize Blockages</h1>
          <p className={styles.lede}>
            The coronary arteries feed the heart muscle itself. When one of them
            narrows — a stenosis — the blood it delivers loses driving pressure.
            This page maps that pressure collapse along a single artery.
          </p>
        </header>

        <nav className={styles.tabs} aria-label="Section tabs">
          {TABS.map((tab, index) => (
            <button
              type="button"
              className={index === 0 ? `${styles.tab} ${styles.tabActive}` : styles.tab}
              key={tab}
              aria-current={index === 0 ? "page" : undefined}
            >
              {tab}
            </button>
          ))}
        </nav>

        <PressureVisualization
          ffr={
            <div className={styles.ffrBlock}>
              <p className={styles.ffrMeta}>fractional flow reserve</p>
              <h2 className={styles.ffrTitle}>FFR</h2>
              <p className={styles.ffrValue}>
                0.00
                <span className={styles.ffrUnit}> distal / proximal ratio</span>
              </p>
            </div>
          }
          infoColumns={
            <div className={styles.infoRow}>
              {INFO_COLUMNS.map((column) => (
                <div className={styles.infoTile} key={column.body}>
                  <span className={styles.infoMain}>{column.main}</span>
                  <span className={styles.infoBody}>{column.body}</span>
                </div>
              ))}
            </div>
          }
        />

        <footer className={styles.footer}>
          <p>
            Illustrative model for educational purposes — not medical advice.
            Hemodynamic data is simulated.
          </p>
        </footer>
      </div>
    </div>
  );
}
