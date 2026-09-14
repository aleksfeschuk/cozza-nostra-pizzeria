import styles from '../styles/Reviews.module.scss'

const REVIEWS = [
  { name: 'Anna K.', quote: 'Najlepsza pizza w Gdańsku! Prawdziwy smak Włoch. Świeże składniki i cudowna atmosfera.' },
  { name: 'Michał P.', quote: 'Zamawiam regularnie i zawsze jest pysznie. Polecam każdemu, kto kocha dobrą pizzę!' },
  { name: 'Kasia W.', quote: 'Świetna obsługa, szybka dostawa i przepyszna pizza. Na pewno wrócę.' },
]

export default function Reviews() {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <p className={styles.eyebrow}>OPINIE KLIENTÓW</p>
                <h2 className={styles.title}>Co mówią nasi klienci?</h2>

                <div className={styles.grid}>
                    {REVIEWS.map((r) => (
                        <div key={r.name} className={styles.card}>
                            <div className={styles.top}>
                                <div className={styles.name}>{r.name}</div>
                                <div className={styles.stars}>★★★★★</div>
                            </div>
                            <p className={styles.quote}>{r.quote}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}