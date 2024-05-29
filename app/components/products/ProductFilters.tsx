"use client"

import { Categories } from "@/models/categories";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useState } from "react";

const StarRatings = dynamic(() => import("react-star-ratings"), {
    ssr: false,
});

const ProductFilters = () => {

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(0)

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const handleChangeMinPrice = (e: any) => {
        const val = parseInt(e.target.value)
        setMinPrice(val)
        if(maxPrice <= val) {
            setMaxPrice(val + 1)
        }
    }

    const handleBtnClick = () => {
        router.push(pathname + `?min=${minPrice}&max=${maxPrice}`)
    }

    const handleChecked = (checkType: string, checkValue: string) => {
        const value = searchParams?.get(checkType)
        return value === checkValue
    }

    const handleChange = (checkType: string, checkValue: string) => {
        router.push(pathname + `?${checkType}=${checkValue}`)
    }

    return (
        <div className="border p-5">
            <div className="mb-5">
                <div className="font-semibold">Price</div>
                <div className="grid grid-cols-3 gap-1">
                    <div className="">
                        <input className="w-full p-2 border rounded-sm input-sm" type="number"
                            min={0} placeholder="Min" value={minPrice} onChange={e => handleChangeMinPrice(e)}
                        />
                        <label className="label">
                            <span className="label-text-alt">Min</span>
                        </label>
                    </div>
                    <div className="">
                        <input className="w-full p-2 border rounded-sm input-sm" type="number"
                            min={0} placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(parseInt(e.target.value))}
                        />
                        <label className="label">
                            <span className="label-text-alt">Max</span>
                        </label>
                    </div>
                    <button className="btn btn-outline btn-primary btn-sm" onClick={handleBtnClick}>Filter</button>
                </div>
            </div>

            <div className="mb-5">
                <div className="font-semibold">Ratings</div>
                <div>
                    {[1, 2, 3, 4, 5].map(r => (
                        <div key={r} className="flex items-center">
                            <input id={`rating-${r}`} type="checkbox"
                                name="ratings"
                                className="w-4 h-4 focus:ring-blue-500"
                                value={r}
                                checked={handleChecked("ratings", `${r}`)}
                                onChange={() => handleChange("ratings", `${r}`)}
                            />
                            <label htmlFor={`rating-${r}`}>
                                <StarRatings rating={r}
                                    numberOfStars={5}
                                    starRatedColor="#ffab04"
                                    starSpacing="1px"
                                    starDimension="20px"
                                    name="ratings"
                                />
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div className="font-semibold">Category</div>
                <div>
                    {Categories.map((c: string, idx) => (
                        <div key={idx} className="flex items-center">
                            <input id={`${c}`} type="checkbox"
                                name="category"
                                className="w-4 h-4 focus:ring-blue-500"
                                value={`${idx}`}
                                checked={handleChecked("category", c)}
                                onChange={() => handleChange("category", c)}
                            />
                            <label htmlFor={`${c}`} className="ml-1">{c}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default ProductFilters