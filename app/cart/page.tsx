"use client"

import { CartItemType, CartItemsContext } from "@/context/CartContext"
import { getGrossTotal } from "@/utils/getProductsCalc"
import Link from "next/link"
import { useContext } from "react"
import toast from "react-hot-toast"
import Image from "next/image"

const CartPage = () => {

    const { cartItems, addToCart, removeFromCart } = useContext(CartItemsContext)

    if (cartItems.length === 0) {
        return (
            <div className="alert xs:mt-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Your cart is empty.</span>
            </div>
        )
    }

    const handleAddQuantity = (item: CartItemType) => {
        addToCart({ ...item, quantity: item.quantity + 1 })
    }

    const handleSubstractQuantity = (item: CartItemType) => {
        const qty = item.quantity - 1

        if (qty < 1) {
            removeFromCart(item.id)
            return
        }

        const newItem: CartItemType = { ...item, quantity: qty }
        addToCart(newItem)
    }

    const handleRemoveProduct = (id: string) => {
        removeFromCart(id)
        toast("Item removed")
    }

    const grossTotal = +(getGrossTotal(cartItems))
    const discount = grossTotal < 1000 ? 0 : +(grossTotal * .05).toFixed(2)
    const netTotal = +(grossTotal - discount).toFixed(2)

    return (
        <div className="xs:p-3">
            <div className="flex justify-between items-center">
                <h3 className='mt-2 mb-3 xs:mt-3 xs:ms-2'>{cartItems.length} Items(s) in cart.</h3>
                {grossTotal < 1000 && <div className="badge badge-secondary badge-outline mt-2 xs:p-5">Get 5% extra off on Rs. 1000 or more</div>}
            </div>
            <div className="grid grid-cols-[1.5fr_.5fr] gap-5 xs:grid-cols-1">
                <div>
                    {cartItems.map(item => (
                        <div key={item.id} className="card card-side bg-base-100 shadow-xl mb-1">
                            <figure className="h-48 w-48">
                                <Image src={item.image} alt="item" height={192} width={192}/>
                            </figure>
                            <div className="card-body flex-row justify-between xs:ps-1 xs:pe-1 xs:flex-col">
                                <div className="flex flex-col justify-center">
                                    <h2 className="card-title">{item.name}</h2>
                                    <div className="text-sm">Seller: {item?.seller}</div>
                                    <h3 className='my-0 font-semibold'>Rs.{item.price}</h3>
                                </div>

                                <div className="flex items-center justify-end">
                                    <button className="btn btn-sm bg-gray-300" onClick={() => handleSubstractQuantity(item)}>-</button>
                                    <div className="px-2">{item.quantity}</div>
                                    <button className="btn btn-sm bg-gray-300" disabled={item.quantity === item.stock} onClick={() => handleAddQuantity(item)}>+</button>
                                </div>

                                <div className="flex flex-col items-end justify-center gap-2">
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-sm btn-error text-white rounded-full" onClick={() => handleRemoveProduct(item.id)}>Remove</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
                <div className="card bg-base-100 shadow-xl p-5 flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                        <h3 className='my-0'>Gross Total</h3><h3 className='my-0 text-end'>Rs.{grossTotal}</h3>
                        <h3 className='my-0'>Discount</h3><h3 className='my-0 text-end'>Rs.{discount}</h3>
                        <h3 className='my-0'>Delivery</h3><h3 className='my-0 text-end'>Rs.{0}</h3>
                        <h3 className='my-0 font-bold'>Total</h3><h3 className='my-0 text-end font-bold'>Rs.{netTotal}</h3>
                    </div>
                    <hr className="my-0" />
                    <Link className="btn btn-sm bg-black text-white" href={"/delivery"}>Proceed</Link>
                    <Link className="btn btn-sm" href={"/"}>Return home</Link>
                </div>
            </div>
        </div>
    )
}

export default CartPage