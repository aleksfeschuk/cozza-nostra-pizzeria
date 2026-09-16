import { useState } from "react";
import { Link } from "react-router-dom";
import styles from '../styles/CheckoutPage.module.scss'
import { CheckIcon } from "lucide-react";
import { useCart } from "../context/CartContext";
import { track } from "../components/lib/analytics";

type DeliveryMethod = 'delivery' | 'pickup'

export default function CheckoutPage() {
    const { items, totalPrice, clear } = useCart()
    
    const [method, setMethod] = useState<DeliveryMethod>('delivery')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('Gdańsk')
    const [postalCode, setPostalCode] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [cardExpiry, setCardExpiry] = useState('')
    const [cardCvv, setCardCvv] = useState('')
    const [cardName, setCardName] = useState('')

    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [orderId, setOrderId] = useState<string | null>(null)

    const deliveryFee = method === 'delivery' && totalPrice > 0 ? 8 : 0
    const grandTotal = totalPrice + deliveryFee

    function validate(): string | null {
        if (items.length === 0) return 'Twój koszyk jest pusty.'
        if (!name.trim()) return 'Podaj imię i nazwisko.'
        if (!phone.trim()) return 'Podaj numer telefonu.'
        if (method === 'delivery' && (!street.trim() || !postalCode.trim())) {
            return 'Podaj adres dostawy.'
        }

        if (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim() || !cardName.trim()) {
            return 'Uzupełnij dane karty.'
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
                label: `${items.reduce((n, i) => n + i.quantity, 0)} pizz, ${grandTotal} zł, ${method}`,
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
                                    <label className={styles.label} htmlFor="city">
                                        Miasto
                                    </label>
                                    <input
                                        id="city"
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
                        <div className={styles.sectionTitle}>Płatność kartą</div>
                        <div className={styles.cardIcons}>VISA · Mastercard (demo — bez realnej płatności)</div>

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
                            To pole płatności jest demonstracyjne — nie łączy się z
                            żadnym prawdziwym operatorem płatności. Podłącz Stripe,
                            PayU lub Przelewy24 przed uruchomieniem produkcyjnym.
                        </p>
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
                        <div key={item.id} className={styles.summaryRow}>
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