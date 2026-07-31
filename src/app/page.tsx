import { PressureVisualization } from "@/components/pressure-visualization";
import styles from "./page.module.css";

const STATS = [
  { value: "100", unit: "mmHg", label: "upstream pressure" },
  { value: "20%+30%", unit: "", label: "sudden pressure drops" },
  { value: "50", unit: "%", label: "pressure lost at the lesions" },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PressureVisualization
          rightText={
            <div className={styles.rightText}>
              <p className={styles.eyebrow}>Coronary hemodynamics</p>
              <h1 className={styles.title}>
                Visualize Blockages
              </h1>
              <p className={styles.lede}>
                The coronary arteries feed the heart muscle itself. When one of
                them narrows — a stenosis — the blood it delivers loses driving
                pressure. This page maps that pressure collapse along a single
                artery, from a healthy 100&nbsp;mmHg to zero, with two sudden
                drops at the narrowings.
              </p>
              <div className={styles.stats}>
                {STATS.map((stat) => (
                  <div className={styles.stat} key={stat.label}>
                    <span className={styles.statValue}>
                      {stat.value}
                      <span className={styles.statUnit}>{stat.unit}</span>
                    </span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          }
        />

        <footer className={styles.footer}>
          <p>
            Illustrative model for educational purposes — not medical advice.
            Hemodynamic data is simulated.
          </p>
        </footer>
      </main>
    </div>
  );
}
