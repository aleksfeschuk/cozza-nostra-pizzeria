import { useEffect, useState, type ReactNode } from 'react'
import { CartContext } from './CartContext'
import type { PizzaSize } from '../components/data/menu'


export type CartItem = {
    id: string
    name: string
    price: number
    quantity: number
    size: PizzaSize
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

    function addItem(id: string, name: string, price: number, size: PizzaSize) {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === id && i.size === size)
            if (existing) {
                return prev.map((i) => (i.id === id && i.size === size ? { ...i, quantity: i.quantity + 1} : i))
            }
            return [...prev, {id, name, price, quantity: 1, size}]
        })
    }

    function removeItem(id: string, size: PizzaSize) {
        setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)))
    }

    function increment(id: string, size: PizzaSize) {
        setItems((prev) => prev.map((i) => (i.id === id && i.size === size ? {...i, quantity: i.quantity + 1} : i)))
    }

    function decrement(id: string, size: PizzaSize) {
        setItems((prev) => 
            prev.map((i) => (i.id === id && i.size === size ? {...i, quantity: i.quantity - 1} : i)).filter((i) => i.quantity > 0)
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
