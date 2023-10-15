"use client"

import { IProduct, ReviewType } from "@/models/product"
import dynamic from "next/dynamic";
import { FC, useState } from "react"

const StarRatings = dynamic(() => import("react-star-ratings"), {
    ssr: false,
});

interface IReviewsProps {
    reviews?: ReviewType[]
}

const Reviews: FC<IReviewsProps> = ({ reviews }: IReviewsProps) => {

    return (
        <>
            <h1 className="mt-5 font-semibold">Read what other customers say about this product?</h1>
            <div className="chat chat-start">
                {reviews?.map((r: ReviewType) => (
                    <div className="chat-bubble my-3" key={r._id}>
                        <div className="mb-4 mt-3">
                            <div className="flex items-center gap-5">
                                <div className="avatar online placeholder">
                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                                        <span className="text-xl">{r.user.name}</span>
                                    </div>
                                </div>
                                <p>Posted on: {r.createdAt.toString().split("T")[0]}</p>
                            </div>
                            <div className="ratings">
                                <StarRatings
                                    rating={r.ratings}
                                    starRatedColor="#ffab04"
                                    numberOfStars={5}
                                    name="rating"
                                    starDimension="20"
                                />
                            </div>
                            <div>
                                <p>{r.comment}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Reviews