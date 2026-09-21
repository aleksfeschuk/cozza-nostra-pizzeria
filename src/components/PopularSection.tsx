import { useState } from "react";
import { motion } from "motion/react";
import styles from '../styles/PopularSection.module.scss'
import { POPULAR, priceForSize, type PizzaSize } from "./data/menu";
import { useCart } from "../hooks/useCart";
import { track } from "./lib/analytics";
import { stagger, staggerItem } from "./lib/animations";

const SIZES: PizzaSize[] = ['S', 'M', 'L']
const SIZE_LABEL: Record<PizzaSize, string> = {S: '25cm', M: '30cm', L: '40cm' }

export default function PopularSection() {
    const [selectedSizes, setSelectedSizes] = useState<Record<string, PizzaSize>>(
        Object.fromEntries(POPULAR.map(p => [p.id, 'M']))
    )
    const [justAdded, setJustAdded] = useState<string | null>(null)
    const { addItem } = useCart()

    function setSize(pizzaId: string, size: PizzaSize) {
        setSelectedSizes(prev => ({ ...prev, [pizzaId]: size }))
    }

    function handleAdd(id: string, name: string, priceBase: number) {
        const size = selectedSizes[id] ?? 'M'
        const price = priceForSize(priceBase, size)
        addItem(id, `${name} (${SIZE_LABEL[size]})`, price, size)
        track({ type: 'cart_add', name: `${name} ${size}`})
        const key = `${id} - ${size}`
        setJustAdded(key)
        window.setTimeout(() => setJustAdded(c => (c === key ? null : c)), 1200)
    }

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <p className={styles.eyebrow}>⭐ NAJPOPULARNIEJSZE</p>
                <h2 className={styles.title}>Najczęściej wybierane</h2>
                <p className={styles.sub}>
                    Najczęściej wybierane pizze Cosa Nostra — każda dostępna w 3 rozmiarach.
                </p>

                <motion.div
                className={styles.grid}
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                >
                {POPULAR.map(pizza => {
                    const size = selectedSizes[pizza.id] ?? 'M'
                    const price = priceForSize(pizza.priceBase, size)
                    const addKey = `${pizza.id}-${size}`

                    return (
                    <motion.div
                        key={pizza.id}
                        className={styles.card}
                        variants={staggerItem}
                        whileHover={{
                        y: -8,
                        boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
                        transition: { type: 'spring', stiffness: 300, damping: 24 },
                        }}
                    >
                        <span className={styles.badge}>★ NAJPOPULARNIEJSZA</span>

                        <div className={styles.photoWrap}>
                        <motion.img
                            className={styles.photo}
                            src={pizza.image}
                            alt={pizza.name}
                            loading="lazy"
                            whileHover={{ scale: 1.07, transition: { duration: 0.45 } }}
                        />
                        </div>

                        <div className={styles.body}>
                        <div className={styles.name}>{pizza.name}</div>
                        <p className={styles.desc}>{pizza.description}</p>

                        <div className={styles.footer}>
                            {/* Size selector */}
                            <div className={styles.sizes}>
                            {SIZES.map(s => (
                                <motion.button
                                key={s}
                                className={size === s ? styles.sizeBtnActive : styles.sizeBtn}
                                onClick={() => setSize(pizza.id, s)}
                                whileTap={{ scale: 0.88 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                title={SIZE_LABEL[s]}
                                >
                                {s}
                                </motion.button>
                            ))}
                            </div>

                            <div className={styles.priceRow}>
                            <span className={styles.price}>{price} zł</span>
                            <motion.button
                                className={justAdded === addKey ? styles.addBtnDone : styles.addBtn}
                                onClick={() => handleAdd(pizza.id, pizza.name, pizza.priceBase)}
                                whileTap={{ scale: 0.93, y: 2 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                            >
                                {justAdded === addKey ? 'Dodano ✓' : 'Dodaj'}
                            </motion.button>
                            </div>
                        </div>
                        </div>
                    </motion.div>
                    )
                })}
                </motion.div>
            </div>
        </section>
    )
}