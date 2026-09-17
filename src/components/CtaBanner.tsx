import { motion } from "motion/react"
import styles from '../styles/CtaBanners.module.scss' 
import { track } from './lib/analytics'
import { scalePop } from './lib/animations'


export default function CtaBanner() {
    return (
        <motion.div
            className={styles.inner}
            variants={scalePop}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px'}}
        >
            <p className={styles.eyebrow}>ZAMÓW TERAZ</p>
            <h2 className={styles.title}>Pizza na każdą okazję</h2>
            <p className={styles.body}>
                Na spotkanie z przyjaciółmi, rodzinny obiad czy romantyczną
                kolację. Nasza pizza zawsze się sprawdzi.
            </p>
            <a 
                href="#menu"
                className={styles.btn}
                onClick={()=> track({ type: 'cta_click', label: 'cta_banner_order'})}
            >
                Zamów online →
            </a>
        </motion.div>
    )
}