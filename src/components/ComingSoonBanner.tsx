import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import styles from '../styles/ComingSoonBanner.module.scss'
import { supabase } from './lib/supabase'

function validatePolishPhone(raw: string): { ok: boolean; normalised: string} {
    const cleaned = raw.replace(/[\s\-/]/g, '')

    const digits = cleaned 
        .replace(/^\+48/, '')
        .replace(/^48(?=\d{9}$)/, '')

        const ok = /^[4-9]\d{8}$/.test(digits)
        return { ok, normalised: digits }
}

type State = 'idle' | 'open' | 'loading' | 'success' | 'duplicate' | 'error'

export default function ComingSoonBanner() {
    const [bannerVisible, setBannerVisible] = useState(true)
    const [state, setState] = useState<State>('idle')
    const [phone, setPhone] = useState('')
    const [validationMsg, setValidationMsg] = useState<string | null>(null)

    function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPhone(e.target.value)
        setValidationMsg(null)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const { ok, normalised } = validatePolishPhone(phone)
        if (!ok) {
            setValidationMsg('Wpisz poprawny polski numer telefonu (9 cyfr, np. 500 100 200).')
            return
        }

        setState('loading')

        if (!supabase) {
            await new Promise(r => window.setTimeout(r, 600))
            setState('success')
            return
        }

        const { error } = await supabase
            .from('notifications')
            .insert({ phone, phone_normalised: normalised, source: 'banner' })

        if (!error) {
            setState('success')
            return
        }

        // Postgres unique constraint on phone_normalised → duplicate
        if (error.code === '23505') {
            setState('duplicate')
            return
        }

        console.error('[notifications] insert error:', error)
        setState('error')
    }


    return (
        <AnimatePresence>
            {bannerVisible && (
                <motion.div
                    className={styles.banner}
                    initial={{ height: 'auto', opacity: 1}}
                    exit={{height: 0, opacity: 0, paddingBlock: 0}}
                    transition= {{duration: 0.35, ease: [0.22, 1, 0.36, 1]}}
                >
                    <div className={styles.inner}>
                        <span className={styles.emoji}>🍕</span>
                        <p className={styles.text}>
                            <strong>Wkrótce otwieramy!</strong> Adres i datę podamy wkrótce.
                        </p>

                        {state !== 'success' && state !== 'duplicate' && (
                            <motion.button
                                className={styles.notifyBtn}
                                onClick={() => setState(s => s === 'open' ? 'idle' : 'open')}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                            >
                                {state === 'open' ? 'Zamknij ↑' : 'Powiadom mnie →'}
                            </motion.button>
                        )}

                        {state === 'success' && (
                            <motion.span
                                className={styles.successInline}
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                            >
                                ✓ Gotowe! Wyślemy SMS w dniu otwarcia.
                            </motion.span>
                        )}

                        {state === 'duplicate' && (
                            <span className={styles.successInline}>
                                ✓ Już jesteś na liście!
                            </span>
                        )}
                    </div>
                    

                    <AnimatePresence>
                        {state === 'open' || state === 'loading' || state === 'error' ? (
                            <motion.div
                                className={styles.formWrap}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1}}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                style={{ overflow: "hidden"}}
                            >

                                <form className={styles.form} onSubmit={handleSubmit}>
                                    <div className={styles.inputRow}>
                                        <span className={styles.flag}>🇵🇱 +48</span>
                                        <input
                                        className={styles.input}
                                        type="tel"
                                        inputMode="numeric"
                                        placeholder="500 100 200"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        autoComplete="tel"
                                        maxLength={15}
                                        disabled={state === 'loading'}
                                        />
                                        <motion.button
                                        type="submit"
                                        className={styles.submitBtn}
                                        disabled={state === 'loading' || !phone.trim()}
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.95 }}
                                        >
                                        {state === 'loading' ? '…' : 'Wyślij'}
                                        </motion.button>
                                    </div>

                                    {validationMsg && (
                                        <p className={styles.errorMsg}>{validationMsg}</p>
                                    )}
                                    {state === 'error' && (
                                        <p className={styles.errorMsg}>
                                        Coś poszło nie tak. Spróbuj ponownie.
                                        </p>
                                    )}

                                    <p className={styles.hint}>
                                        Wyślemy jedną wiadomość SMS w dniu otwarcia
                                        z kodem <strong>−10% na pierwsze zamówienie</strong>.
                                        Bez spamu.
                                    </p>
                                </form>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                        
                    <button
                        className={styles.dismiss}
                        aria-label="Zamknij"
                        onClick={() => setBannerVisible(false)}
                    >×</button>
                </motion.div>
            )}
        </AnimatePresence>
    )

}