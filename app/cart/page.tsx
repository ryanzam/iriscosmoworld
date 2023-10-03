"use client"

import { CartItemType, CartItemsContext } from "@/context/CartContext"
import { getGrossTotal } from "@/utils/getProductsCalc"
import { useContext } from "react"
import toast from "react-hot-toast"

const CartPage = () => {

    const { cartItems, addToCart, removeFromCart } = useContext(CartItemsContext)

    if (cartItems.length === 0) {
        return (
            <div className="alert">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Your cart is empty.</span>
            </div>
        )
    }

    const handleAddQuantity = (item: CartItemType) => {
        addToCart({...item, quantity: item.quantity + 1   })
    }

    const handleSubstractQuantity = (item: CartItemType) => {
        const qty = item.quantity - 1

        if(qty < 1) {
            removeFromCart(item.id)
            return
        }

        const newItem: CartItemType = {...item, quantity: qty}
        addToCart(newItem)
    }

    const handleRemoveProduct = (id: string) => {
        removeFromCart(id)
    }

    const grossTotal = +(getGrossTotal(cartItems))
    const tax = +(grossTotal * .15).toFixed(2)
    const netTotal = (grossTotal + tax).toFixed(2)
    return (
        <div>
            <h3 className="mb-3">{cartItems.length} Items(s) in cart.</h3>
            <div className="grid grid-cols-[1.5fr_.5fr] gap-5">
                <div>
                    {cartItems.map(item => (
                        <div key={item.id} className="card card-side bg-base-100 shadow-xl mb-1">
                            <figure className="h-48 w-48">
                                <img src={item.image} alt="item" />
                            </figure>
                            <div className="card-body flex-row justify-between">
                                <div className="flex flex-col justify-center">
                                    <h2 className="card-title">{item.name}</h2>
                                    <div className="text-sm">{item?.seller}</div>
                                    <h3 className="font-semibold">€{item.price}</h3>
                                </div>

                                <div className="flex items-center justify-end">
                                    <button className="btn" onClick={() => handleSubstractQuantity(item)}>-</button>
                                    <div className="px-2">{item.quantity}</div>
                                    <button className="btn" disabled={item.quantity === item.stock} onClick={() => handleAddQuantity(item)}>+</button>
                                </div>

                                <div className="flex flex-col items-end justify-center gap-2">
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-secondary" onClick={() => handleRemoveProduct(item.id)}>Remove</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
                <div className="card  bg-base-100 shadow-xl p-5 flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                        <h3>Gross Total</h3><h3 className="text-end">{grossTotal}</h3>
                        <h3>Tax (15%)</h3><h3 className="text-end">{tax}</h3>            
                        <h3 className="font-bold">Total</h3><h3 className="text-end font-bold">{netTotal}</h3>
                    </div>
                    <button className="btn btn-primary">Checkout</button>
                    <button className="btn">Return home</button>
                </div>
            </div>
        </div>
    )
}

export default CartPage