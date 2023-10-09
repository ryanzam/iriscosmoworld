"use client"

import { Elements } from "@stripe/react-stripe-js"
import PaymentForm from "../components/payment/PaymentForm"
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    `${process.env.PUBLISHABLE_KEY}`!
);

const CheckoutPage = () => {
    return (
        <Elements stripe={stripePromise} >
            <PaymentForm />
        </Elements>
    )
}

export default CheckoutPage