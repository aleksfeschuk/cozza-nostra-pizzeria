import { createContext } from "react";
import type { CartItem } from "./CartProvider";
import type { PizzaSize } from "../components/data/menu";

export type CartContextValue = {
    items: CartItem[]
    addItem: (id: string, name: string, price: number, size: PizzaSize) => void
    removeItem: (id: string, size: PizzaSize) => void
    increment: (id: string, size: PizzaSize) => void
    decrement: (id: string, size: PizzaSize) => void
    clear: () => void
    totalCount: number
    totalPrice: number
    isOpen: boolean
    openCart: () => void
    closeCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

