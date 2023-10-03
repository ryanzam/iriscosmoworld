import { CartItemType } from "@/context/CartContext";

export function getGrossTotal(cartItems: CartItemType[]){
    return cartItems.reduce((acc, currItem) => acc + currItem.quantity * currItem.price, 0).toFixed(2)
}