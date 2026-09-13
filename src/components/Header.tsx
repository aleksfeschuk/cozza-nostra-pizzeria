import { useState } from "react";
import {Link, useLocation} from 'react-router-dom';
import styles from '../styles/Header.module.scss';
import { CartIcon, MenuIcon, CloseIcon } from './Icons';


const NAV = [
    { label: 'Strona główna', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'Jak to działa', href: '#jak-to-dziala' },
    { label: 'Kontakt', href: '#kontakt' },
]

export default function Header() {
    const [open, setOpen] = useState(false)
    const location = useLocation()
    const isHome = location.pathname === '/'

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link to="/" className={styles.logo}>
                    <span className={styles.name}>COSA NOSTRA</span>
                    <span className={styles.tag}>PIZZERIA</span>
                </Link>

                {isHome && (
                    <>
                        <nav className={styles.nav}>
                            {NAV.map((item, i) => (
                                <a key={item.href} href={item.href} className={i === 0 ? styles.navLinkActive : styles.navLink}>
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        <div className={styles.actions}>
                            <a href="#menu" className={styles.cart}>
                                <CartIcon width={18} height={18} />
                                Koszyk <span className={styles.badge}>0</span>
                            </a>
                            <a href="#kontakt" className={styles.cta} onClick={handleCta}>
                                Zamów teraz →
                            </a>
                        </div>

                        <button
                            aria-label="Menu"
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)}
                            className={styles.burger}
                        >
                            {open ? <CloseIcon width={18} height={18} /> : <MenuIcon width={18} height={18} />}
                        </button>
                    </>
                )}
            </div>

            {isHome && open && (
                <div className={styles.mobileMenu}>
                    {NAV.map((item) => (
                        <a key={item.href} href={item.href} className={styles.mobileMenuLink} onClick={() => setOpen(false)}>
                            {item.label}
                        </a>
                    ))}

                    <a href="#kontakt" className={styles.cta} onClick={() => { handleCta();         setOpen(false) }}>
                        Zamów teraz →
                    </a>
                </div>
            )}

        </header>
    )

}