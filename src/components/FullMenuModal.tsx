import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import styles from '../styles/FullMenuModal.module.scss'
import { CloseIcon } from './Icons'
import { SearchIcon } from 'lucide-react'
import { MENU, priceForSize, SIZE_CM, SIZES, type PizzaSize } from './data/menu'
import { useCart } from '../hooks/useCart'
import { track } from './lib/analytics'
import { stagger, staggerItem, overlayVariants, scalePop } from '../components/lib/animations'



type Props = {
    isOpen: boolean
    onClose: () => void
}

export function FullMenuModal({ isOpen, onClose }: Props) {
    const [query, setQuery] = useState('')
    const [justAdded, setJustAdded] = useState<string | null>(null)
    const [selectedSizes, setSelectedSizes] = useState<Record<string, PizzaSize>>(
        Object.fromEntries(MENU.map(p => [p.id, 'M' as PizzaSize]))
    )

    const { addItem } = useCart()

    function setSize(id: string, size: PizzaSize) {
        setSelectedSizes(prev => ({ ...prev, [id]: size }))
    }


    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [isOpen, onClose])

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    useEffect(() => {
        if (isOpen) setQuery('')
    }, [isOpen])

    function handleAdd(id: string, name: string, priceBase: number) {
        const size = selectedSizes[id] ?? 'M'
        const price = priceForSize(priceBase, size)
        addItem(id, `${name}, (${SIZE_CM[size]})`, price, size )
        track({ type: 'cart_add', name: `${name} ${size}` })
        const key = `${id}-${size}`
        setJustAdded(key)
        window.setTimeout(() => setJustAdded(c => c === id ? null : c), 1200)
    }

    const filtered = MENU.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.overlay}
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={onClose}    
                >
                    <motion.div
                        className={styles.modal}
                        variants={scalePop}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className={styles.header}>
                            <h2 className={styles.title}>Nasze menu</h2>
                            <motion.button
                                className={styles.closeBtn}
                                onClick={onClose}
                                aria-label="Zamknij menu"
                                whileTap={{ scale: 0.88, rotate: 90}}
                                transition={{ type: 'spring', stiffness: 500, damping: 25}}
                            >
                                <CloseIcon width={16} height={16} />
                            </motion.button>
                        </div>

                        <div className={styles.searchWrap}>
                            <span className={styles.searchIcon}>
                                <SearchIcon />
                            </span>
                            <input 
                                className={styles.search}
                                type="text"
                                placeholder="Szukaj pizzy... (np. Margherita, salami)"
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                autoFocus
                            />
                        </div>

                        {query && (
                            <p className={styles.count}>
                                {filtered.length === 0
                                    ? 'Brak wyników' 
                                    : `${filtered.length} z ${MENU.length} pizz`
                                }
                            </p>
                        )}

                        {filtered.length === 0 ? (
                            <div className={styles.empty}>
                                Nie znaleziono pizzy dla „{query}" 🍕
                            </div>
                        ): (
                            <motion.div
                                className={styles.grid}
                                variants={stagger}
                                initial="hidden"
                                animate="visible"
                                key={query}
                            >
                                {filtered.map(pizza => (
                                    <motion.div
                                        key={pizza.id}
                                        className={styles.card}
                                        variants={staggerItem}
                                        whileHover={{
                                            y: -6,
                                            boxShadow: '0 16px 36px rgba(0,0,0,0.12)',
                                            transition: {type: 'spring', stiffness: 320, damping: 24},
                                        }}
                                        whileTap={{ scale: 0.98}}
                                    >
                                        <div className={styles.photoWrap}>
                                            <motion.img
                                                className={styles.photo}
                                                src={pizza.image}
                                                alt={pizza.name}
                                                loading='lazy'
                                                whileHover={{
                                                    scale: 1.08,
                                                    transition: {duration: 0.45, ease: [0.22, 1, 0.36, 1]},
                                                }}
                                            />
                                        </div>

                                        <div className={styles.cardBody}>
                                            <div className={styles.name}>{pizza.name}</div>
                                            <p className={styles.desc}>{pizza.description}</p>
                                            <div className={styles.cardFooter}>
                                                <div style={{ display: 'flex', gap: '4px'}}>
                                                    {SIZES.map(s => {
                                                        const active = (selectedSizes[pizza.id] ?? 'M') === s

                                                        return (
                                                            <motion.button
                                                                key={s}
                                                                onClick={() => setSize(pizza.id, s)}
                                                                whileTap = {{ scale: 0.85 }}
                                                                style={{
                                                                    width: '28px', height: '28px',
                                                                    borderRadius: '7px',
                                                                    border: `1.5px solid ${active ? '#c1382b' : '#e7dfcf'}`,
                                                                    background: active ? '#c1382b' : "#fff",
                                                                    color: active ? '#fff' : '#8b8276',
                                                                    fontSize: '10px', fontWeight: 700,
                                                                    cursor: 'pointer',
                                                                    fontFamily: 'inherit'
                                                                }}
                                                                title={SIZE_CM[s]}
                                                            >
                                                                {s}
                                                            </motion.button>
                                                        )
                                                    })}

                                                </div>

                                                <span className={styles.price}>
                                                   {priceForSize(pizza.priceBase, selectedSizes[pizza.id] ?? 'M')} zł
                                                </span>
                                                <motion.button
                                                    className={justAdded === `${pizza.id} - ${selectedSizes[pizza.id]} ?? 'M'}` ? styles.addBtnDone : styles.addBtn}
                                                    onClick={() => handleAdd(pizza.id, pizza.name, pizza.priceBase)}
                                                    whileTap={{ scale: 0.92, y: 2}}
                                                    transition={{ type: 'spring', stiffness: 500, damping: 25}}
                                                >
                                                    {justAdded === `${pizza.id}-${selectedSizes[pizza.id] ?? 'M'}` ? 'Dodano ✓' : 'Dodaj'}
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}