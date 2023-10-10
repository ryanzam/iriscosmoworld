"use client"

import { createContext, useEffect, useState } from "react";

export type CartItemType = {
    id: string,
    name: string,
    price: number,
    image: string,
    seller: string,
    stock: number,
    quantity: number
}

export interface ICartContext {
    cartItems: CartItemType[];
    addToCart: (item: CartItemType) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

export const CartItemsContext = createContext({ } as ICartContext);

const CartContextProvider = ({ children }: any) => {
    const [cartItems, setCartItems] = useState<CartItemType[]>([])

    useEffect(() => {
        setCartItemsState()
    },[])

    const setCartItemsState = () => {
        setCartItems(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!).cartItems : [])
    };

    const addToCart = (item: CartItemType) => {
        const isItemAlreadyAdded = cartItems.find(cartItem => cartItem.id === item.id)

        let newCartItems = []
        if (isItemAlreadyAdded) {
            newCartItems = cartItems.map(ci =>
                ci.id === item.id ? item : ci)
        } else {
            newCartItems = [...cartItems, item]
        }
        localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }))
        setCartItemsState()
    }

    const removeFromCart = (id: string) => {
        const newCartItems = cartItems.filter(ci => ci.id !== id)

        localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }))
        setCartItemsState()
    }

    const clearCart = () => {
        localStorage.clear()
        setCartItemsState()
    }

    return (
        <CartItemsContext.Provider
            value={{ cartItems, addToCart, removeFromCart, clearCart }}
        >
            {children}
        </CartItemsContext.Provider>
    )
}

export default CartContextProvider