import { useState, useEffect } from "react";
import {Link, useLocation} from 'react-router-dom';
import { motion, AnimatePresence } from "motion/react";
import styles from '../styles/Header.module.scss';
import { CartIcon, MenuIcon, CloseIcon } from './Icons';
import { track } from "./lib/analytics";
import { useCart } from "../hooks/useCart";
import { mobileMenuPanel, mobileMenuLink, overlayVariants, buttonTap } from './lib/animations'


const NAV = [
    { label: 'Strona główna', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'Jak to działa', href: '#jak-to-dziala' },
    { label: 'Kontakt', href: '#kontakt' },
]

function scrollTo(href: string, e: React.MouseEvent) {
    if(!href.startsWith('#')) return
    e.preventDefault()
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start'})
    }
}


export default function Header() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()
    const isHome = location.pathname === '/'
    const { totalCount, openCart } = useCart()

    useEffect(() => {
        setOpen(false)
    }, [location.pathname])

    useEffect(() => {
        function onScroll() {
            setScrolled(window.scrollY > 20) 
        }
    
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [open])


    function handleCta() {
        track({ type: 'cta_click', label: 'header_book'})
    }

    return (
        <>
            <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
                <div className={styles.inner}>
                    <Link to="/" className={styles.logo}>
                        <motion.span 
                            className={styles.name}
                            whileHover={{letterSpacing: '0.08em' }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
                        >
                            COSA NOSTRA
                        </motion.span>
                        <span className={styles.tag}>PIZZERIA</span>
                    </Link>

                    {isHome && (
                        <nav className={styles.nav}>
                            {NAV.map((item, i) => (
                                <a 
                                    key={item.href} 
                                    href={item.href} 
                                    className={i === 0 ? styles.navLinkActive : styles.navLink}
                                    onClick={(e) => scrollTo(item.href, e)}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    )}

                        <div className={styles.actions}>
                            <motion.button 
                                type="button" 
                                className={styles.cart} 
                                onClick={openCart}
                                whileTap={buttonTap}
                            >
                                <CartIcon width={18} height={18} />
                                Koszyk 
                                <AnimatePresence mode="popLayout">
                                    {totalCount > 0 && (
                                        <motion.span 
                                            key={totalCount}
                                            className={styles.badge}
                                            initial={{ scale: 0.3, opacity: 0, rotate: -15}}
                                            animate={{ scale: 1, opacity: 1, rotate: 0}}
                                            exit={{ scale: 0.3, opacity: 0}}
                                            transition={{ type: 'spring', stiffness: 600, damping: 22}}
                                        >
                                                {totalCount}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                
                            </motion.button>

                            {isHome && (
                                <motion.a 
                                    href="#kontakt" 
                                    className={styles.cta} 
                                    onClick={handleCta}
                                    whileHover={{ y: -2, boxShadow: '0 8px 0 #7a1f15, 0 12px 28px rgba(193,56,43,0.4)'}}
                                    whileTap={{ y: 3, boxShadow: '0 1px 0 #7a1f15, 0 2px 8px rgba(193,56,43,0.15)' }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 25}}
                                >
                                    Zamów teraz →
                                </motion.a>
                            )}
                        </div>

                        <motion.button
                            aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)}
                            className={styles.burger}
                            whileTap={{ scale: 0.85 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        >
                            <AnimatePresence>
                                {open ? (
                                    <motion.span
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0}}
                                        animate={{ rotate: 0, opacity: 1}}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.16 }}
                                    >
                                        <CloseIcon width={18} height={18} />
                                    </motion.span>    
                                )   :   (
                                    <motion.span
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.16}}
                                    >
                                        <MenuIcon width={18} height={18} />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
            </header>

            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            className={styles.mobileOverlay}
                            variants={overlayVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={() => setOpen(false)}
                        
                        />

                        <motion.div
                            className={styles.mobilePanel}
                            variants={mobileMenuPanel}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <motion.div
                                className={styles.mobileOnTop}
                                variants={mobileMenuLink}
                            >
                                <span className={styles.mobilePanelLogo}>CN</span>
                                <motion.button
                                    className={styles.mobileCloseBtn}
                                    onClick={() => setOpen(false)}
                                    aria-label="Zamknij menu"
                                    whileTap={{ scale: 0.85, rotate: 90 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                >
                                    <CloseIcon width={16} height={16} />
                                </motion.button>
                            </motion.div>

                            <nav className={styles.mobileNav}>
                                {NAV.map((item, i) => (
                                    <motion.a
                                        key={item.href}
                                        href={item.href}
                                        className={styles.mobileNavLink}
                                        variants={mobileMenuLink}
                                        onClick={(e) => { scrollTo(item.href, e); setOpen(false) }}
                                        whileHover={{x: 10, color: '#f3eee2' }}
                                        whileTap={{ scale: 0.97}}
                                        transition={{ type: 'spring', stiffness: 400, damping: 28}}
                                    >
                                        <span className={styles.mobileNavIndex}>0{i + 1}</span>
                                        {item.label}
                                    </motion.a>
                                ))}
                            </nav>

                            <motion.div className={styles.mobileFooter} variants={mobileMenuLink}>
                                <motion.a
                                    href="#kontakt"
                                    className={styles.mobileCta}
                                    onClick={() => { handleCta(); setOpen(false) }}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.97, y: 2}}
                                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                >
                                    Zamów teraz →
                                </motion.a>
                                <div className={styles.mobileInfo}>
                                    <span>📍 Gdańsk</span>
                                    <span>11:00 – 23:00</span>
                                </div>
                            </motion.div>
                                
                                <div className={styles.mobileBg} aria-hidden="true">PIZZA</div>
                        </motion.div>
                        
                    </>
                )}
            </AnimatePresence>
        </>
    )
}