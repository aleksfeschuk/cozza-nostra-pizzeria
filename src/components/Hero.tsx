import styles from '../styles/Hero.module.scss'
import { PinIcon, ClockIcon, ArrowIcon } from './Icons'
import { track } from '../components/lib/'


export default function Hero() {
    return (
        <section id="home" className={styles.hero}>
            <div className={styles.inner}>
                <div>
                    <p className={styles.eyebrow}>PRAWDZIWA WŁOSKA PIZZA</p>
                    <h1 className={styles.title}>
                        Tradycja,
                        <br />
                        która smakuje.
                    </h1>
                    <p className={styles.body}>
                        Autentyczna neapolitańska pizza, świeże składniki i prawdziwa
                        włoska atmosfera. Dostarczamy do Ciebie w Gdańsku — prosto z
                        pieca.
                    </p>
                    <div className={styles.meta}>
                        <span className={styles.item}>
                            <PinIcon width={15} height={15} /> Gdańsk
                        </span>
                        <span className={styles.item}>
                            <ClockIcon width={15} height={15} /> Otwarte 11:00 - 23:00
                        </span>
                    </div>
                    <div className={styles.actions}>
                        <a href="#kontakt"
                        className={styles.btnPrimary}
                        onClick={() => track({type: 'cta_click', label: 'hero_order'})}
                        >
                            Zamów teraz <ArrowIcon width={15} height={15} />
                        </a>
                        
                        <a
                            href="#menu"
                            className={styles.btnOutline}
                            onClick={() => track({ type: 'cta_click', label: 'hero_view_menu' })}
                        >
                            Zobacz menu
                        </a>
                    </div>
                </div>

                <div className={styles.photo}>
                    <img src="/images/hero.svg" alt="Pizza Cosa Nostra" />
                </div>
            </div>
        </section>
    )
}