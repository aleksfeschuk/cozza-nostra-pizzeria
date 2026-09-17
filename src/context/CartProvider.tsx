import { useEffect, useState, type ReactNode } from 'react'
import { CartContext } from './CartContext'


export type CartItem = {
    id: string
    name: string
    price: number
    quantity: number
}


const STORAGE_KEY = 'cn_cart'

export default function CartProvider({ children }: { children: ReactNode}) {
    const [items, setItems] = useState<CartItem[]>(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            return raw ? (JSON.parse(raw) as CartItem[]) : []
        } catch {
            return []
        }
    })
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }, [items])

    function addItem(id: string, name: string, price: number) {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === id)
            if (existing) {
                return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1} : i))
            }
            return [...prev, {id, name, price, quantity: 1}]
        })
    }

    function removeItem(id: string) {
        setItems((prev) => prev.filter((i) => i.id !== id))
    }

    function increment(id: string) {
        setItems((prev) => prev.map((i) => (i.id === id ? {...i, quantity: i.quantity + 1} : i)))
    }

    function decrement(id: string) {
        setItems((prev) => 
            prev.map((i) => (i.id === id ? {...i, quantity: i.quantity - 1} : i)).filter((i) => i.quantity > 0)
        )
    }

    function clear(){
        setItems([])
    }

    const totalCount = items.reduce((sum, i) => sum + i.quantity, 0)
    const totalPrice = items.reduce((sum, i) => sum + i.quantity * i.price, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                increment,
                decrement,
                clear,
                totalCount,
                totalPrice,
                isOpen,
                openCart: () => setIsOpen(true),
                closeCart: () => setIsOpen(false)
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
