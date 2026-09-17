import { motion } from 'motion/react'
import styles from '../styles/Reviews.module.scss'
import { fadeUp, stagger, staggerItem } from './lib/animations'

const REVIEWS = [
  { name: 'Anna K.', quote: 'Najlepsza pizza w Gdańsku! Prawdziwy smak Włoch. Świeże składniki i cudowna atmosfera.' },
  { name: 'Michał P.', quote: 'Zamawiam regularnie i zawsze jest pysznie. Polecam każdemu, kto kocha dobrą pizzę!' },
  { name: 'Kasia W.', quote: 'Świetna obsługa, szybka dostawa i przepyszna pizza. Na pewno wrócę.' },
]

export default function Reviews() {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, margin:"-60px"}}
                >
                    <p className={styles.eyebrow}>OPINIE KLIENTÓW</p>
                    <h2 className={styles.title}>Co mówią nasi klienci?</h2>
                </motion.div>
                

                <motion.div 
                    className={styles.grid}
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, margin: '-40px'}}
                >
                    {REVIEWS.map((r) => (
                        <motion.div 
                            key={r.name} 
                            className={styles.card}
                            variants={staggerItem}
                            whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)', transition: {duration: 0.2 } }}>
                            <div className={styles.top}>
                                <div className={styles.name}>{r.name}</div>
                                <div className={styles.stars}>★★★★★</div>
                            </div>
                            <p className={styles.quote}>{r.quote}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}