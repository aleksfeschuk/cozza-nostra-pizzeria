import { motion } from 'motion/react'
import styles from '../styles/HowItWorks.module.scss'
import { track } from './lib/analytics'
import { slideLeft, stagger, staggerItem } from './lib/animations'

const STEPS = [
  { n: '01', title: 'Wybierasz pizzę', body: 'Przeglądasz nasze menu i dodajesz ulubione do koszyka.' },
  { n: '02', title: 'Sprawdzamy adres', body: 'Wpisujesz swój adres i sprawdzamy, czy dostarczamy w Twojej okolicy.' },
  { n: '03', title: 'Zamawiasz', body: 'Opłacasz zamówienie i czekasz na dostawę lub odbiór osobisty.' },
]

export default function HoWItWorks() {
    return (
        <section id="jak-to-dziala" className={styles.section}>
            <div className={styles.inner}>
                <motion.div
                    variants={slideLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, margin: '-60px'}}
                >
                    <p className={styles.eyebrow}>JAK TO DZIAŁA</p>
                    <h2 className={styles.title}>Prosto i szybko</h2>
                    <p className={styles.body}>
                        Zamów pizzę w kilku prostych krokach i ciesz się smakiem prosto
                        z pieca.
                    </p>
                    <a 
                        href="#menu"
                        className={styles.btn}
                        onClick={() => track({ type: 'cta_click', label: 'how_it_works_order'})}
                    >
                        Zamów teraz →
                    </a>
                </motion.div>

                <motion.div 
                    className={styles.steps}
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, margin: '-40px'}}>
                    {STEPS.map((s) => (
                        <motion.div key={s.n} variants={staggerItem}>
                            <div className={styles.num}>{s.n}</div>
                            <div className={styles.stepTitle}>{s.title}</div>
                            <div className={styles.stepBody}>{s.body}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}