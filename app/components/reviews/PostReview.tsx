"use client"

import { IProduct } from "@/models/product"
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FC, useState } from "react"
import toast from "react-hot-toast";

const StarRatings = dynamic(() => import("react-star-ratings"), {
    ssr: false,
});

interface IPostReviewProps {
    product: IProduct
}

const PostReview: FC<IPostReviewProps> = ({ product }: IPostReviewProps) => {

    const [comment, setComment] = useState("");
    const [ratings, setRatings] = useState(0);

    const router = useRouter()

    const handlePostReview = (e: any) => {
        e.preventDefault()

        const postReview = axios.put(`${process.env.BASE_URL}/api/products/${product._id}`, { ratings, comment })
        toast.promise(postReview, {
            loading: "Posting review",
            success: () => {
                router.refresh()
                return "Review posted"
            },
            error: "Error while posting your review"
        })
    }

    return (
        <>
            <h1 className="my-3 text-end font-semibold">Post your rating and reiew about this product?</h1>
            <div className="chat chat-end">
                <div className="chat-bubble">
                    <div className="mb-4 mt-3">
                        <div className="ratings">
                            <StarRatings
                                rating={ratings}
                                starRatedColor="#ffab04"
                                numberOfStars={5}
                                name="rating"
                                starDimension="40"
                                changeRating={(e) => setRatings(e)}
                            />
                        </div>
                        <textarea className="textarea textarea-primary my-4 w-full text-neutral-800"
                            placeholder="Write your review"
                            value={comment}
                            onChange={e => setComment(e.target.value)}>
                        </textarea>
                        <button className="btn btn-primary btn-sm w-full" onClick={handlePostReview}>Post</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostReview