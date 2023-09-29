"use client"

import { Categories } from "@/models/categories";
import StarRatings from "react-star-ratings"

const ProductFilters = () => {

    let searchParams: URLSearchParams;

    const onChecked = (filterType: string, filterValue: string) => {
        if(typeof window != "undefined") {
            searchParams = new URLSearchParams(window.location.search)

            const value = searchParams.get(filterType)

            if(filterValue === value) {
                return true
            }
            return false
        }
    }

    return (
        <div className="border p-5">
              <div className="mb-5">
                <div className="font-semibold">Price</div>
                <div className="grid grid-cols-3 gap-1">
                    <div className="">
                        <input className="w-full p-2 border rounded-sm" type="number" min={0} placeholder="Min"/>
                    </div>
                    <div className="">
                        <input className="w-full p-2 border rounded-sm" type="number" min={0} placeholder="Max" />
                    </div>
                    <button className="btn btn-primary">Filter</button>
                </div>
            </div>

            <div className="mb-5">
                <div className="font-semibold">Ratings</div>
                <div>
                    {[1,2,3,4,5].map(r => (
                        <div key={r} className="flex items-center">
                            <input id={`rating-${r}`} type="checkbox" 
                                className="w-4 h-4 focus:ring-blue-500"
                                value={r}
                                defaultChecked={onChecked("ratings", `${r}`)}
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
                        <div className="flex items-center">
                            <input id={`${idx}`} type="checkbox" 
                                className="w-4 h-4 focus:ring-blue-500"
                                value={`${idx}`}
                                defaultChecked={onChecked("category", `${c}`)}
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