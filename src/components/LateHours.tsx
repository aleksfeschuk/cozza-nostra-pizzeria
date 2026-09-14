import styles from '../styles/LateHours.module.scss'
import { MoonIcon } from '../components/Icons'
import { track } from './lib/analytics'

export default function LateHours() {
    return (
        <section className={styles.lateSection}>
            <div className={styles.lateInner}>
                <div className={styles.lateLeft}>
                    <MoonIcon width={22} height={22} className={styles.moonIcon} />
                    <div>
                        <div className={styles.lateTitle}>Pizza do późnych godzin</div>
                        <p className={styles.lateBody}>
                            Masz ochotę na pizzę o 2:00? Zamów online i ciesz się pizzą
                            nawet późno w nocy.
                        </p>
                        <a 
                            href="#menu"
                            className={styles.lateBtn}
                            onClick={() => track({ type: 'cta_click', label: 'late_hours_order'})}
                        >
                            Zamów teraz →
                        </a>
                    </div>
                </div>
                <div className={styles.openLate}>
                    Open
                    <br />
                    Late
                </div>
            </div>
        </section>
    )
}