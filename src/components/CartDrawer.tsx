import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import styles from '../styles/CartDrawer.module.scss'
import { useCart } from "../hooks/useCart";
import { CloseIcon } from "./Icons";
import { track } from "./lib/analytics";
import { MENU } from "./data/menu";
import { TrashIcon } from "lucide-react";
import { drawerVariants, overlayVariants } from "./lib/animations";

export default function CardDrawer() {
    const { items, increment, decrement, removeItem, totalPrice, isOpen, closeCart} = useCart()
    const navigate = useNavigate()

    // if (!isOpen) return null

    function handleRemove(id: string, name: string) {
        removeItem(id)
        track({ type: 'cart_remove', name})
    }

    function handleDecrement(id: string, name: string, quantity: number) {
        decrement(id)
        if (quantity <= 1) track({ type: 'cart_remove', name})
    }

    function gotoCheckout() {
        closeCart()
        navigate('/checkout')
    }

    return (
        <>
            <motion.div 
                className={styles.overlay} 
                variants={overlayVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
                onClick={closeCart} 
                style={{ pointerEvents: isOpen ? 'all' : 'none' }}
            />
            <motion.div 
                className={styles.drawer} 
                role="dialog" 
                aria-label="Koszyk"
                variants={drawerVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
            >
                <div className={styles.header}>
                    <span className={styles.title}>Twój koszyk</span>
                    <button className={styles.closeBtn} onClick={closeCart} aria-label="Zamknij koszyk">
                        <CloseIcon width={16} height={16} />
                    </button>
                </div>

                <div className={styles.body}>
                    {items.length === 0 ? (
                        <div className={styles.empty}>
                            <p>Koszyk jest pusty.</p>
                            <p>Dodaj pierwszą pizzę z menu!</p>
                        </div>
                    ) : (
                        items.map((item) => {
                            const pizza = MENU.find((p) => p.id === item.id)
                            return (
                                <div key={item.id} className={styles.row}>
                                    {pizza && <img className={styles.rowPhoto} src={pizza.image} alt={item.name}/>}
                                    <div className={styles.rowInfo}>
                                        <div className={styles.rowName}>{item.name}</div>
                                        <div className={styles.rowPrice}>{item.price} zł / szt.</div>
                                        <div className={styles.qty} style={{marginTop: 6}}>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => handleDecrement(item.id, item.name, item.quantity)}
                                                aria-label="Zmniejsz ilość"
                                            >
                                                -
                                            </button>
                                            <span className={styles.qtyValue}>{item.quantity}</span>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick = {() => increment(item.id)}
                                                aria-label="Zwiększ ilość"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        className={styles.removeBtn}
                                        onClick={() => handleRemove(item.id, item.name)}
                                        aria-label={`Usuń ${item.name} z koszyka`}
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>
                            )
                        })
                    )}
                </div>

                <div className={styles.footer}>
                    <div className={styles.totalRow}>
                        <span>Razem</span>
                        <span>{totalPrice} zł</span>
                    </div>
                    <button className={styles.checkoutBtn} disabled={items.length === 0} onClick={gotoCheckout}>
                        Przejdź do zamówienia →
                    </button>
                </div>
            </motion.div>
        </>
    )
}