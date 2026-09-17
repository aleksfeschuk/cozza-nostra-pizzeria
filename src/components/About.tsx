import { motion } from 'motion/react';
import styles from '../styles/About.module.scss';
import { track } from '../components/lib/analytics'
import { slideLeft, slideRight } from 

export default function About() {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <img className={styles.photo} src="src/images/pizzeria/how-this-work.jpeg" alt="Przygotowanie ciasta na pizzę" />
                
                <div>
                    <p className={styles.eyebrow}>O NAS</p>
                    <h2 className={styles.title}>Pasja do włoskiej pizzy</h2>
                    <p className={styles.body}>
                        Cosa Nostra to pizzeria, która powstała z miłości do prawdziwej
                        kuchni włoskiej. Używamy świeżych składników i tradycyjnych
                        receptur, aby każda pizza była wyjątkowym doświadczeniem. Nasza
                        misja to proste składniki, świetny smak i radość, którą chcemy
                        dzielić z każdym gościem.
                    </p>
                    <a
                        href="#menu"
                        className={styles.btn}
                        onClick={() => track({ type: 'cta_click', label: 'about_learn_more' })}
                    >
                        Poznaj nas →
                    </a>
                </div>
            </div>
        </section>
    )
}