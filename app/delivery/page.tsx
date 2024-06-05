"use client"

import { useContext, useEffect, useState } from "react";
import { AddressType } from "../components/modals/AddressModal";
import axios from "axios";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { getGrossTotal } from "@/utils/getProductsCalc";
import { CartItemsContext } from "@/context/CartContext";
import Link from "next/link";
import Breadcrums from "../components/Breadcrums";
import getSignature from "../actions/getSignature";
import Image from "next/image";
import { PROD_URL } from "../(root)/page";

const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Cart", path: "/cart" },
    { name: "Order", path: "/order" }
]

const DeliveryPage = async (user: any) => {

    const [address, setDAddress] = useState<AddressType>({} as AddressType);

    const router = useRouter()
    const { cartItems } = useContext(CartItemsContext)

    useEffect(() => {
        axios.get(`${PROD_URL}/api/address`)
            .then((res: any) => {
                setDAddress({ ...res?.data[0] })
            }).catch(err => toast.error("Error fetching address :", err.nessage))
    }, [])

    const emptyAddress = Object.keys(address).length === 0;

    const grossTotal = +(getGrossTotal(cartItems))
    const discount = grossTotal < 100 ? 0 : +(grossTotal * .10).toFixed(2)
    const netTotal = +(grossTotal - discount).toFixed(2)

    const handleCheckout = async () => {
        try {
            if (Object.keys(address).length === 0) {
                toast("Update address before checking out!")
                return
            }
            const transaction_uuid = new Date().getTime().toString()

            const signature = getSignature(
                `total_amount=${netTotal},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`
            );

            const formData = {
                amount: netTotal,
                failure_url: `${process.env.BASE_URL}`,
                product_delivery_charge: "0",
                product_service_charge: "0",
                product_code: "EPAYTEST",
                signature: signature,
                signed_field_names: "total_amount,transaction_uuid,product_code",
                success_url: `${process.env.BASE_URL}/user/orders`,
                tax_amount: "0",
                total_amount: netTotal,
                transaction_uuid,
            };

            await axios.post(`${PROD_URL}/api/orders`, {
                netTotal,
                address,
                cartItems
            })

            payEsewa(formData)

            await axios.post(`${PROD_URL}/api/emailOrder`, {
                address,
                netTotal
            })
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const payEsewa = (formData: any) => {
        var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", path);

        for (var key in formData) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", formData[key]);
            form.appendChild(hiddenField);
        }
        document.body.appendChild(form);
        form.submit();
    }

    return (
        <div>
            <Breadcrums breadcrums={breadcrumbs} />
            <div className="grid grid-cols-[1.3fr_.7fr] gap-5 xs:grid-cols-1">
                <div className="card bg-base-100 shadow-xl mb-1">
                    <div className="card-body">
                        <h2 className="card-title">Delivery Information</h2>
                        <hr className="mb-4" />

                        <div className="flex items-center">
                            {emptyAddress ?
                                <p className="italic">No address found</p> :
                                <div>
                                    <h6 className="font-medium">{address?.phone}</h6>
                                    <h6 className="font-medium">{address?.street}</h6>
                                    <h6 className="font-medium">{address?.city}, {address?.wardNumber}</h6>
                                </div>
                            }
                            {emptyAddress &&
                                <button className="btn ml-auto btn-outline btn-sm"
                                    onClick={() => router.push("/user")}
                                >
                                    Add your address
                                </button>}
                        </div>
                        <div className="mt-auto">
                            <Link className="btn mr-2 btn-sm" href={"/cart"}>Back</Link>
                            <button className="btn btn-accent btn-sm" onClick={handleCheckout} disabled={cartItems.length === 0 && emptyAddress}>Checkout</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-200 shadow-xl p-5 flex flex-col gap-3">
                    <h3 className="font-bold">Summary</h3>
                    <hr />
                    <div className="grid grid-cols-2 gap-3">
                        <h3>Gross Total</h3><h3 className="text-end">{grossTotal}</h3>
                        <h3>Discount (10%)</h3><h3 className="text-end">{discount}</h3>
                        <h3 className="font-bold">Total</h3><h3 className="text-end font-bold">{netTotal}</h3>
                    </div>

                    <hr />
                    <h3 className="font-bold">Item(s) in your cart</h3>
                    <hr />

                    {cartItems?.map(ci => (
                        <div key={ci.id} className="flex items-center my-3">
                            <div className="indicator">
                                <span className="indicator-item badge badge-secondary">{ci.quantity}</span>
                                <div className="grid w-12 h-12 bg-base-300 place-items-center">
                                    <Image
                                        width="50"
                                        height="50"
                                        src={ci.image}
                                        alt="Title"
                                    />
                                </div>
                            </div>

                            <div className="ml-5">
                                <p>{ci.name.substring(0, 50)}</p>
                            </div>
                        </div>
                    ))}
                    <p className="mt-1 text-gray-500">
                        Total: Rs.{netTotal}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DeliveryPage