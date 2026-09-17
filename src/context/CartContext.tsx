import { createContext } from "react";
import type { CartItem } from "./CartProvider";

export type CartContextValue = {
    items: CartItem[]
    addItem: (id: string, name: string, price: number) => void
    removeItem: (id: string) => void
    increment: (id: string) => void
    decrement: (id: string) => void
    clear: () => void
    totalCount: number
    totalPrice: number
    isOpen: boolean
    openCart: () => void
    closeCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

