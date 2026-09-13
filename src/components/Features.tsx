import styles from "../styles/Features.module.scss"
import { LeafIcon, FireIcon, DeliveryIcon, HeartIcon } from './Icons'

const FEATURES = [
    { icon: LeafIcon, title: 'Świeże składniki', sub: 'Tylko to, co najlepsze.' },
    { icon: FireIcon, title: 'Piec opalany drewnem', sub: 'Autentyczny smak Neapolu.' },
    { icon: DeliveryIcon, title: 'Szybka dostawa', sub: 'Ciepła pizza, prosto z Twoich drzwi.' },
    { icon: HeartIcon, title: 'Tworzone z miłością', sub: 'Bo jedzenie łączy ludzi.' },
]


export default function Features() {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                {FEATURES.map((f) => (
                    <div key={f.title} className={styles.item}>
                        <f.icon width={26} height={26} />
                        <span className={styles.title}>{f.title}</span>
                        <span className={styles.sub}>{f.sub}</span>

                    </div>
                ))}
            </div>

        </section>
    )
}