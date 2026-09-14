import styles from '../styles/Footer.module.scss'

const NAV = [
  { label: 'Strona główna', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Jak to działa', href: '#jak-to-dziala' },
  { label: 'Kontakt', href: '#kontakt' },
]

export default function Footer() {
  return (
    <footer id="kontakt" className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerLogo}>COSA NOSTRA</div>
        <nav className={styles.footerNav}>
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className={styles.footerLink}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className={styles.footerLocation}>Gdańsk, Polska</div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomInner}>
          © 2026 Gdansk Cosa Nostra Pizzeria. Wszystkie prawa zastrzeżone.
        </div>
      </div>
    </footer>
  )
}