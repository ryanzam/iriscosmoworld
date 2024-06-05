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

const Orders = () => {

    const [data, setData] = useState<data>()
    const params = useSearchParams()

    const token = params?.get("data")

    const { emptyCart } = useContext(CartItemsContext)
    const router= useRouter()

    useEffect(() => {
        if (token) {
            emptyCart()
            router.replace("/user/orders")
            toast.success("👏 Item(s) successfully ordered!")
        }
        function fetch() {
            axios.get(`https://iriscosmo.vercel.app/api/orders`, {})
                .then(res => setData(res?.data))
                .catch(err => toast.error(err.message))
        }
        fetch()
    }, [emptyCart])

    const renderOrders = () => {
        if (data?.orders.length === 0) {
            return <Empty title="You don't have any orders yet."/>
        }

        return (
            <div className="p-3">
                <h2 className="font-bold pb-3">My Orders</h2>
                {data?.orders.map((order, k) => (
                    <OrderCard key={k} order={order} />
                ))}
                {data?.total && data?.pageSize  && <Pagination total={data!.total} pageSize={data!.pageSize} />}
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