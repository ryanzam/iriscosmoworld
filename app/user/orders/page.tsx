"use client"

import Empty from "@/app/components/Empty"
import Pagination from "@/app/components/Pagination"
import OrderCard from "@/app/components/orders/OrderCard"
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { CartItemsContext } from "@/context/CartContext"

type data = {
    orders: [],
    pageSize: number,
    total: number
}

const Orders = async () => {

    const [data, setData] = useState<data>()
    const params = useSearchParams()

    const confirm = params?.get("confirmation")
    const { emptyCart } = useContext(CartItemsContext)
    const router= useRouter()

    useEffect(() => {
        if (confirm) {
            emptyCart()
            router.replace("/user/orders")
        }
        async function fetch() {
            axios.get(`/api/orders`, {})
                .then(res => setData(res?.data))
                .catch(err => toast.error(err.message))
        }
        fetch()
    }, [])

    const renderOrders = () => {
        if (data?.orders.length === 0) {
            return <Empty title="You don't have any orders yet."/>
        }

        return (
            <div className="p-3">
                <h2 className="font-bold pb-3">My Orders</h2>
                {data?.orders.map(order => (
                    <OrderCard order={order} />
                ))}
                <Pagination total={data!.total} pageSize={data!.pageSize} />
            </div>
        )
    }

    return (
        <div className="">

            {renderOrders()}
        </div>
    )
}

export default Orders