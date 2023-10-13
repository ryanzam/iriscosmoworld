"use client"

import { FC, useState } from "react"
import TextInput from "../inputs/TextInput"
import Modal from "./Modal";
import { BsSend } from "react-icons/bs"
import axios from "axios";
import toast from "react-hot-toast";
import { IOrder } from "../orders/OrdersTable";
import OrderCard from "../orders/OrderCard";

enum OrderStatus {
    PENDING = "Pending",
    SENT = "Sent",
    DELIVERED = "Delivered"
}

interface IOrderModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: () => void;
    order?: IOrder
}

const OrderModal: FC<IOrderModalProps> = ({ title, isOpen, onClose, order }) => {

    const [orderStatus, setOrderStatus] = useState(order?.orderStatus)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const updateOrder = axios.put(`/api/admin/orders`, { id: order?._id, orderStatus })

        toast.promise(updateOrder, {
            loading: "Submitting Order",
            success: () => {
                onClose()
                return "Order saved"
            },
            error: "Error while adding Order"
        })
    }

    const modalBody = (
        <OrderCard order={order}>
            <div className="mt-3">
                <hr />
                <label className="label">
                    <span className="label-text">Select order status</span>
                </label>
                <select className="select select-primary w-full"
                    value={orderStatus}
                    onChange={(e: any) => setOrderStatus(e.target.value)} required>
                    {Object.values(OrderStatus).map(s => (
                        <option key={s}>{s}</option>
                    ))}
                </select>
                <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                    <BsSend />
                    Submit
                </button>
            </div>
        </OrderCard>
    )

    return (
        <Modal isOpen={isOpen} title={title} modalBody={modalBody} onClose={onClose} />
    )
}

export default OrderModal