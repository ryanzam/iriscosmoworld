import { FaMoneyBillWave, FaStar, FaThumbsUp } from "react-icons/fa"
import { IOrder } from "../orders/OrdersTable"
import { FC } from "react"

interface IOrderStatsProps {
    orders: IOrder[]
}

const OrdersStats:FC<IOrderStatsProps> = ({ orders }: IOrderStatsProps) => {

    const totalSold = orders?.reduce((acc: number, o: IOrder) => acc + o.paymentInfo.paidAmount, 0).toFixed(2)
    const totalOrders = orders?.reduce((acc: number, o:IOrder) => acc + o.orderItems.length,0)

    return (
        <div className="stats shadow w-full">

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <FaMoneyBillWave size={30} />
                </div>
                <div className="stat-title">Total sold</div>
                <div className="stat-value">€ {totalSold}</div>
                <div className="stat-desc">Including Tax</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <FaStar size={30} />
                </div>
                <div className="stat-title">Total Sold Items</div>
                <div className="stat-value">{totalOrders}</div>
                <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <FaThumbsUp size={30} />
                </div>
                <div className="stat-title">Total Orders</div>
                <div className="stat-value">{orders?.length}</div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>

        </div>
    )
}

export default OrdersStats