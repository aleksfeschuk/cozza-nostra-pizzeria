import { useEffect, useRef, useState } from "react";
import styles from '../styles/MenuCarousel.module.scss';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons'
import { MENU } from '../'
import { track } from '../'

export default function MenuCarousel() {
    const trackRef = useRef<HTMLDivElement>(null)
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [atStart, setAtStart] = useState(true)
    const [atEnd, setAtEnd] = useState(false)

    function scrollByCards(direction: 'left' | 'right') {
        const el = trackRef.current
        if (!el) return 
        const cardWidth = el.querySelector(`.${styles.card}`)?.clientWidth ?? 260
        const amount = (cardWidth + 16) * 2
        el.scrollBy({left: direction === 'right' ? amount : -amount, behavior: 'smooth'})
        track({type: 'menu_scroll', direction})
    }

    function updateEdgeState() {
        const el = trackRef.current
        if (!el) return
        setAtStart(el.scrollLeft < 8) 
        setAtEnd(el.scrollLeft + el.scrollWidth >= el.scrollWidth - 8) 
    } 


    return (
        <section id="menu" className={styles.section}>
            <div className={styles.header}>
                <div>
                    <p className={styles.eyebrow}>NASZE MENU</p>
                    <h2 className={styles.title}>Najlepsze pizze w Gdańsku</h2>
                    <p className={styles.body}>
                        Klasyczne receptury, najwyższej jakości składniki i wyjątkowy
                        smak — tak powstają nasze pizze. Przewiń, żeby zobaczyć więcej.
                    </p>
                </div>
                <div className={styles.controls}>
                    <button
                        className={styles.arrowBtn}
                        aria-label="Poprzednie pizze"
                        onClick={() => scrollByCards('left')}
                        disabled={atStart}
                    >
                        <ChevronLeftIcon width={18} height={18} />
                    </button>

                    <button
                        className={styles.arrowBtn}
                        aria-label="Następne pizze"
                        onClick={() => scrollByCards('right')}
                        disabled={atEnd}
                    >
                        <ChevronRightIcon width={18} height={18} />
                    </button>
                </div>
            </div>

            
        </section>
    )
}