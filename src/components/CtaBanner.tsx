import styles from '../styles/CtaBanners.module.scss'
import { track } from './lib/analytics'


export default function CtaBanner() {
    return (
        <section className={styles.section}>
            <div className={styles.eyebrow}>ZAMÓW TERAZ</div>
            <h2 className={styles.title}>Pizza na każdą okazję</h2>
            <p className={styles.boyd}>
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
        </section>
    )
}