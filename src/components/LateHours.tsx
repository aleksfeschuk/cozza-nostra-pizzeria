import { motion } from 'motion/react'
import styles from '../styles/LateHours.module.scss'
import { MoonIcon } from '../components/Icons'
import { track } from './lib/analytics'
import { slideLeft, slideRight } from './lib/animations'

export default function LateHours() {
    return (
        <section className={styles.lateSection}>
            <div className={styles.lateInner}>
                <motion.div 
                    className={styles.lateLeft}
                    variants={slideLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, margin: '-60px'}}>
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
                </motion.div>
                <motion.div 
                    className={styles.openLate}
                    variants={slideRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, margin: '-60px'}}
                    transition={{ delay: 0.15}}
                    >
                        Open
                        <br />
                        Late
                </motion.div>
            </div>
        </section>
    )
}