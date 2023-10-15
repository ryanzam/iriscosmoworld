import { IProduct } from "@/models/product"
import { FaMoneyBillWave, FaStar, FaThumbsUp } from "react-icons/fa"

const Stats = ({ data }: any) => {

    const totalWorth = data.products.reduce((acc: number, p: IProduct) => acc + p.stock * p.price, 0).toFixed(2)

    return (
        <div className="stats shadow w-full">

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <FaMoneyBillWave size={30}/>
                </div>
                <div className="stat-title">Total product worth</div>
                <div className="stat-value md:text-lg">€ {totalWorth}</div>
                <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <FaStar size={30}/>
                </div>
                <div className="stat-title">Most reviewed</div>
                <div className="stat-value md:text-lg">{data.products[0].name}</div>
                <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <FaThumbsUp size={30}/>
                </div>
                <div className="stat-title">High rated</div>
                <div className="stat-value md:text-lg">{data.products[1].name}</div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>

        </div>
    )
}

export default Stats