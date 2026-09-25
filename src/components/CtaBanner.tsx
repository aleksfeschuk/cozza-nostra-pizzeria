import styles from '../styles/CtaBanners.module.scss'
import { track } from './lib/analytics'
import ovenImg from '../images/pizzeria/its-time-to-make.jpeg'

// Full-bleed "oven" band: the fire photo breaks up the long dark page
// and sits right between the story (About) and social proof (Reviews).
export default function CtaBanner() {
  function goToMenu(e: React.MouseEvent) {
    e.preventDefault()
    track({ type: 'cta_click', label: 'cta_banner_order' })
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.band}>
      <img className={styles.bg} src={ovenImg} alt="" aria-hidden="true" loading="lazy" />
      <div className={styles.shade} />
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Wieczór z pizzą</p>
        <h2 className={styles.title}>450°C, 90 sekund, zero kompromisów.</h2>
        <p className={styles.body}>
          Na spotkanie z przyjaciółmi, rodzinny obiad czy kolację we dwoje —
          zamów, a my rozpalamy piec.
        </p>
        <a href="#menu" className={styles.btn} onClick={goToMenu}>
          Wybierz pizzę
        </a>
      </div>
    </section>
  )
}
