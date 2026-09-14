import { useEffect, useRef, useState } from "react";
import styles from '../styles/MenuCarousel.module.scss';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons'
import { MENU } from "./data/menu";
import { track } from "./lib/analytics";

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


    useEffect(() => {
        const seen = new Set<string>()
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
                        const idx = cardRefs.current.findIndex((el) => el === entry.target)

                        if (idx !== -1) setActiveIndex(idx)

                        const id = (entry.target as HTMLElement).dataset.pizzaName
                        if (id && !seen.has(id)) {
                            seen.add(id)
                            track({ type: "pizza_view", name: id})
                        }
                    }
                }
            },
            { root: trackRef.current, threshold: [0.6]}
        )
        cardRefs.current.forEach((el) => el && observer.observe(el))
        return () => observer.disconnect()
    }, [])

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

            <div className={styles.track} ref={trackRef} onScroll={updateEdgeState}>
                {MENU.map((pizza, i) => (
                    <div
                        key={pizza.id}
                        className={styles.card}
                        ref={(el) => {cardRefs.current[i] = el}}
                        data-pizza-name={pizza.name}
                    >
                        <img className={styles.photo} src={pizza.image} alt={pizza.name} loading="lazy" />
                        <h3 className={styles.name}>{pizza.name}</h3>
                        <p className={styles.desc}>{pizza.description}</p>
                        <div className={styles.footer}>
                            <span className={styles.price}>{pizza.price}</span>
                            <button
                                className={styles.addBtn}
                                onClick={() => track({ type: 'cta_click', label: `add_${pizza.id}` })}
                            >
                                Dodaj
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.dots}>
                {MENU.map((pizza, i) => (
                    <span key={pizza.id} className={i === activeIndex ? styles.dotActive : styles.dot} />
                ))}
            </div>

            <div className={styles.fullMenuWrap}>
                <a 
                    href="#menu"
                    className={styles.fullMenuBtn}
                    onClick={() => track({ type: 'cta_click', label: 'full_menu'})}    
                >
                    Zobacz pełne menu
                </a>
            </div>
        </section>
    )
}