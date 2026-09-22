import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import styles from '../styles/CheckoutPage.module.scss'
import { CheckIcon } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { track } from "../components/lib/analytics";

type DeliveryMethod = 'delivery' | 'pickup'
type PaymentMethod = 'card' | 'cash' | 'cash_on_delivery'

export default function CheckoutPage() {
    const { items, totalPrice, clear } = useCart()
    
    const [method, setMethod] = useState<DeliveryMethod>('delivery')
    const [payment, setPayment] = useState<PaymentMethod>('card')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [district, setDistrict] = useState('')
    const [city, setCity] = useState('Gdańsk')
    const [postalCode, setPostalCode] = useState('')

    const DISTRICT_FEES: Record<string, number> ={
        'Wrzeszcz': 6,
        'Przymorze': 6,
        'Brzeźno': 6,
        'Zaspa': 8,
        'Letnica': 8,
        'Aniołki': 10,
    }

    const DISTRICTS = Object.keys(DISTRICT_FEES)

    const [cardNumber, setCardNumber] = useState('')
    const [cardExpiry, setCardExpiry] = useState('')
    const [cardCvv, setCardCvv] = useState('')
    const [cardName, setCardName] = useState('')

    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [orderId, setOrderId] = useState<string | null>(null)

    const [promoInput, setPromoInput] = useState('')
    const [promoApplied, setPromoApplied] = useState<string | null>(null)
    const [promoError, setPromoError] = useState<string | null>(null)
    const [discount, setDiscount] = useState(0)

    const PROMO_CODES: Record<string, { type: 'percent' | 'fixed'; value: number; label: string }> = {
        PIZZA10:  { type: 'percent', value: 10, label: '-10%' },
        NOSTRA20: { type: 'percent', value: 20, label: '-20%' },
        WELCOME:  { type: 'fixed',   value: 5,  label: '-5 zł' },
        OPEN10:   { type: 'percent', value: 10, label: '-10% (kod powitalny)' },
    }

    function applyPromo() {
        const code = promoInput.trim().toUpperCase()
        const promo = PROMO_CODES[code]

        if (!promo) {
            setPromoError('Nieprawidłowy kod. Sprawdź pisownię.')
            setPromoApplied(null)
            setDiscount(0)
            return
        } 
        setPromoError(null)
        setPromoApplied(promo.label)
        const base = totalPrice + (method === 'delivery' ? 8 : 0)
        setDiscount(
            promo.type === 'percent'
            ? Math.round(base * promo.value / 100)
            : promo.value
        )
    }

    const deliveryFee = method === 'delivery' && totalPrice > 0 
        ? (DISTRICT_FEES[district] ?? 8) 
        : 0
    const grandTotal = Math.max(0, totalPrice + deliveryFee - discount)

    function validate(): string | null {
        if (items.length === 0) return 'Twój koszyk jest pusty.'
        if (!name.trim()) return 'Podaj imię i nazwisko.'
        if (!phone.trim()) return 'Podaj numer telefonu.'
        if (method === 'delivery' && (!street.trim() || !district || !postalCode.trim())) {
            return 'Podaj ulicę, dzielnicę i kod pocztowy.'
        }

        if (payment === 'card') { 
        
            if (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim() || !cardName.trim()) {
                return 'Uzupełnij dane karty.'
            }
        }
        return null
    }


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const validationError = validate()
        if (validationError) {
            setError(validationError)
            return
        }
        setError(null)
        setSubmitting(true)

        // Demo no real payment

        window.setTimeout(() => {
            const id = `CN-${Math.floor(100000 + Math.random() * 900000)}`
            setOrderId(id)
            track({
                type: 'order_placed',
                label: `${items.reduce((n, i) => n + i.quantity, 0)} pizz, ${grandTotal} zł, ${method}, ${payment}`,
            })
            clear()
            setSubmitting(false)
        }, 700)
    }

    if (orderId) {
        return (
            <div className={styles.page}>
                <div className={styles.inner}>
                    <div className={styles.confirm}>
                        <div className={styles.confirmIcon}>
                            <CheckIcon />
                        </div>
                        <h1 className={styles.confirmTitle}>Zamówienie przyjęte!</h1>
                        <p className={styles.confirmBody}>
                            Dziękujemy, {name.split(' ')[0]}. Zadzwonimy, jeśli będziemy
                            mieli pytania dotyczące zamówienia.
                        </p>
                        <div className={styles.confirmOrderId}>{orderId}</div>
                        <div>
                            <Link to="/" className={styles.confirmBackBtn}>
                                Wróć do strony głównej
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    return (
    <div className={styles.page}>
        <div className={styles.inner}>
            <Link to="/" className={styles.backLink}>
                ← Wróć do menu
            </Link>
            <h1 className={styles.title}>Dokończ zamówienie</h1>

            <div className={styles.layout}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>Sposób odbioru</div>
                        <div className={styles.deliveryToggle}>
                            <button
                                type="button"
                                className={method === 'delivery' ? styles.toggleBtnActive : styles.toggleBtn}
                                onClick={() => setMethod('delivery')}
                            >
                                Dostawa
                            </button>
                            <button
                                type="button"
                                className={method === 'pickup' ? styles.toggleBtnActive : styles.toggleBtn}
                                onClick={() => setMethod('pickup')}
                            >
                            Odbiór osobisty
                            </button>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="name">
                                Imię i nazwisko
                            </label>
                            <input
                                id="name"
                                className={styles.input}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Jan Kowalski"
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="phone">
                                Numer telefonu
                            </label>
                            <input
                                id="phone"
                                className={styles.input}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="500 000 000"
                                type="tel"
                            />
                        </div>

                        {method === 'delivery' && (
                            <>
                                <div className={styles.field}>
                                    <label className={styles.label} htmlFor="street">
                                        Dzielnica dostawy
                                    </label>
                                    <select
                                        id="district"
                                        className={styles.input}
                                        value={district}
                                        onChange={e => setDistrict(e.target.value)}
                                        >
                                        <option value="">Wybierz dzielnicę</option>
                                        {DISTRICTS.map(d => (
                                            <option key={d} value={d}>
                                            {d} — {DISTRICT_FEES[d]} zł dostawa
                                            </option>
                                        ))}
                                    </select>
                                    {district && (
                                        <p style={{ fontSize: '12px', color: '#3e7d3a', marginTop: '6px' }}>
                                            ✓ Dostarczamy do: {district} — opłata {DISTRICT_FEES[district]} zł
                                        </p>
                                    )}
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label} htmlFor="street">
                                        Ulica i numer
                                    </label>
                                    <input
                                        id="street"
                                        className={styles.input}
                                        value={street}
                                        onChange={(e) => setStreet(e.target.value)}
                                        placeholder="ul. Długa 12/3"
                                    />
                                </div>

                                <div className={styles.fieldRow}>
                                    <div className={styles.field}>
                                        <label className={styles.label}>
                                            Miasto
                                        </label>
                                        <input
                                            className={styles.input}
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label} htmlFor="postal">
                                            Kod pocztowy
                                        </label>
                                        <input
                                            id="postal"
                                            className={styles.input}
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                            placeholder="80-000"
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>Metoda płatności</div>

                        <div className={styles.paymentGrid}>
                            {[
                                { value: 'card' as PaymentMethod, label: 'Karta płatnicza', icon: '💳', sub: 'VISA · Mastercard' },
                                { value: 'cash' as PaymentMethod, label: 'Gotówka', icon: '💵', sub: 'Płatność przy odbiorze' },
                                { value: 'cash_on_delivery' as PaymentMethod, label: 'Za pobraniem', icon: '🚚', sub: 'Kurier pobiera gotówkę' },
                            ].map(opt => (
                                <motion.button
                                    key={opt.value}
                                    type="button"
                                    className={payment === opt.value ? styles.payOptActive : styles.payOpt}
                                    onClick={() => setPayment(opt.value)}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition= {{ type: 'spring', stiffness: 400, damping: 24}}
                                >
                                    <span className={styles.payOptIcon}>{opt.icon}</span>
                                    <span className={styles.payOptLabel}>{opt.label}</span>
                                    <span className={styles.payOptSub}>{opt.sub}</span>
                                    {payment === opt.value && (
                                        <motion.span
                                            className={styles.payOptCheck}
                                            initial={{ scale: 0}}
                                            animate={{ scale: 1}}
                                            transition={{ type: 'spring', stiffness: 600, damping: 22}}
                                        >
                                            ✓  
                                        </motion.span>
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        <AnimatePresence>
                            {payment === 'card' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div style={{paddingTop: '20px'}}>
                                    <div className={styles.cardIcons}>
                                        VISA · Mastercard (demo — bez realnej płatności)
                                    </div>

                                    <div className={styles.field}>
                                        <label className={styles.label} htmlFor="cardName">
                                            Imię i nazwisko na karcie
                                        </label>
                                        <input
                                            id="cardName"
                                            className={styles.input}
                                            value={cardName}
                                            onChange={(e) => setCardName(e.target.value)}
                                            placeholder="Jan Kowalski"
                                        />
                                    </div>

                                    <div className={styles.field}>
                                        <label className={styles.label} htmlFor="cardNumber">
                                            Numer karty
                                        </label>
                                        <input
                                            id="cardNumber"
                                            className={styles.input}
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                            placeholder="4242 4242 4242 4242"
                                            inputMode="numeric"
                                        />
                                    </div>

                                    <div className={styles.fieldRow}>
                                        <div className={styles.field}>
                                            <label className={styles.label} htmlFor="cardExpiry">
                                                Data ważności
                                            </label>
                                            <input
                                                id="cardExpiry"
                                                className={styles.input}
                                                value={cardExpiry}
                                                onChange={(e) => setCardExpiry(e.target.value)}
                                                placeholder="MM/RR"
                                            />
                                        </div>
                                        <div className={styles.field}>
                                            <label className={styles.label} htmlFor="cardCvv">
                                                CVV
                                            </label>
                                            <input
                                                id="cardCvv"
                                                className={styles.input}
                                                value={cardCvv}
                                                onChange={(e) => setCardCvv(e.target.value)}
                                                placeholder="123"
                                                inputMode="numeric"
                                            />
                                        </div>
                                    </div>

                                    <p className={styles.payNote}>
                                        Pole demonstracyjne — podłącz Stripe lub PayU przed
                                        uruchomieniem produkcyjnym.
                                    </p>
                                </div>
                            </motion.div>
                            )}
                        </AnimatePresence>
                        

                        <AnimatePresence>
                            {(payment === 'cash' || payment === 'cash_on_delivery') && (
                                <motion.div
                                    className={styles.cashNote}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {payment === 'cash'
                                        ? '💵 Przygotuj gotówkę przy odbiorze osobistym lub dostawie.'
                                        : '🚚 Kurier pobierze gotówkę przy dostarczeniu zamówienia.'}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>Kod rabatowy</div>
                        <div className={styles.promoRow}>
                            <input
                                className={styles.input}
                                placeholder="np. PIZZA10"
                                value={promoInput}
                                onChange={e => { setPromoInput(e.target.value); setPromoError(null) }}
                                disabled={!!promoApplied}
                            />
                            {promoApplied ? (
                                <motion.button
                                    type="button"
                                    className={styles.promoRemoveBtn}
                                    onClick={() => { setPromoApplied(null);  setDiscount(0); setPromoInput('') }}
                                    whileTap={{ scale: 0.95}}
                                >
                                    Usuń
                                </motion.button>
                            ) : (
                                <motion.button
                                    type="button"
                                    className={styles.promoBtn}
                                    onClick={applyPromo}
                                    whileHover={{y: -1}}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Zastosuj
                                </motion.button>
                            )}
                        </div>
                        {promoError && <p className={styles.promoError}>{promoError}</p>}
                        {promoApplied && (
                            <motion.p
                            className={styles.promoSuccess}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            >
                                ✓ Zastosowano: {promoApplied} — oszczędzasz {discount} zł!
                            </motion.p>
                        )}

                    </div>


                    {error && <p className={styles.errorText}>{error}</p>}

                    <button type="submit" className={styles.submitBtn} disabled={submitting || items.length === 0}>
                    {submitting ? 'Przetwarzanie…' : `Zapłać ${grandTotal} zł i zamów`}
                    </button>
                </form>

                <div className={styles.summary}>
                    <div className={styles.summaryTitle}>Twoje zamówienie</div>
                    {items.length === 0 ? (
                        <p className={styles.empty}>Koszyk jest pusty.</p>
                    ) : (
                    <>
                        {items.map((item) => (
                        <div key={`${item.id}-${item.size}`} className={styles.summaryRow}>
                            <span className={styles.summaryRowName}>{item.name}</span>
                            <span className={styles.summaryRowQty}>×{item.quantity}</span>
                            <span>{item.price * item.quantity} zł</span>
                        </div>
                        ))}
                        <hr className={styles.summaryDivider} />
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryRowName}>Dostawa</span>
                            <span>{deliveryFee === 0 ? '—' : `${deliveryFee} zł`}</span>
                        </div>
                        {discount > 0 && (
                            <div className={styles.summaryRow}>
                                <span className={styles.summaryRowName} style={{color: '#3e7d3a'}}>
                                    Rabat ({promoApplied})
                                </span>
                                <span 
                                    style={{ color: '#3e7d3a', fontWeight: 700}}
                                >-{discount} zł</span>
                            </div>
                        
                        )}
                        <hr className={styles.summaryDivider} />
                        <div className={styles.summaryTotal}>
                            <span>Razem</span>
                            <span>{grandTotal} zł</span>
                        </div>
                    </>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}