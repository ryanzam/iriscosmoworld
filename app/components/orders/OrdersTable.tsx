"use client"

import { useCallback, useEffect, useState } from "react"
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import Pagination from "../Pagination"

import { IProduct } from "@/models/product"
import { useSearchParams } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

import { AddressType } from "@/app/components/modals/AddressModal";
import { UserType } from "../modals/ProfileModal"
import OrderModal from "../modals/OrderModal"
import OrdersStats from "../stats/OrderStats"

type PaymentInfoType = {
    id: string,
    paidTax: number,
    paidAmount: number,
    paymentStatus: string
}

export interface IOrder {
    _id: string,
    user: UserType,
    deliveryInfo: AddressType,
    orderItems: IProduct[],
    paymentInfo: PaymentInfoType,
    orderStatus: string
}

export type OrderDataType = {
    orders: IOrder[],
    pageSize: number,
    total: number
}

const OrdersTable =  () => {

    const [data, setData] = useState({} as OrderDataType)
    const [selectedOrder, setSelectedOrder] = useState()
    const [showOrderModal, setShowOrderModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const searchParams: any = useSearchParams()

    useEffect(() => {
        fetchOrders()
    }, [data?.total])

    const fetchOrders = useCallback(() => {
        axios.get(`${process.env.BASE_URL}/api/admin/orders`, searchParams)
            .then(res => {
                setLoading(true)
                setData(res?.data)
            })
            .catch(err => toast.error(err.message))
            .finally(() => {
                setLoading(false)
            })
    }, [data.total])

    if (loading || !data.orders) {
        return
    }

    const onEditOrder = (order: any) => {
        setSelectedOrder(order)
        setShowOrderModal(true)
    }

    const onDeleteOrder = (id: string) => {
        const confirm = window.confirm("Are you sure, you want to delete this product?")
        if (!confirm)
            return

        let productPromise = axios.delete(`${process.env.BASE_URL}/api/admin/orders/` + id)
        toast.promise(productPromise, {
            loading: "Deleting product",
            success: () => {
                fetchOrders()
                return "Product deleted"
            },
            error: "Error while deleting product"
        })
    }

    const onCloseModal = () => {
        setShowOrderModal(false)
        fetchOrders()
    }

    return (
        <div className="">
            {showOrderModal &&
                <OrderModal title="Update Order" isOpen={showOrderModal} onClose={onCloseModal} order={selectedOrder} />
            }

            {data.orders && data.orders.length > 0 && <OrdersStats orders={data.orders}/>}

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Amount</th>
                        <th>Order Status</th>
                        <th>Payment Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.orders?.map(o => (
                        <tr key={o._id}>
                            <td>
                                <div className="flex items-center">
                                    <div className="font-bold">{o._id}</div>
                                </div>
                            </td>
                            <td>€{o.paymentInfo.paidAmount}</td>
                            <td>
                                <span className={`badge 
                                    ${o.orderStatus === "Delivered" ? "badge-success" : "badge-warning"} font-semibold`}
                                >
                                    {o.orderStatus}
                                </span>
                            </td>
                            <td>
                                <span className={`badge 
                                    ${o.paymentInfo.paymentStatus === "paid" ? "badge-success" : "badge-warning"} font-semibold`}
                                >
                                    {o.paymentInfo.paymentStatus}
                                </span>
                            </td>
                            <td className="join join-vertical lg:join-horizontal">
                                <button className="btn join-item btn-ghost" title="Edit order"
                                    onClick={() => onEditOrder(o)}>
                                    <AiOutlineEdit size={18} />
                                </button>
                                <button className="btn join-item btn-ghost" title="Delete order"
                                    onClick={() => onDeleteOrder(o._id)}
                                >
                                    <AiOutlineDelete size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr><th>Total Orders: {data?.total}</th></tr>
                </tfoot>
            </table>
            <div className="mt-3">
                {data.total && data.pageSize && <Pagination total={data?.total} pageSize={data?.pageSize} />}
            </div>
        </div>
    )
}

export default OrdersTable