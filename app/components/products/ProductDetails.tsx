"use client"

import { IProduct, ReviewType } from "@/models/product"
import dynamic from "next/dynamic";
import { FC, useContext, useState } from "react"
import Breadcrums from "../Breadcrums";
import { CartItemType, CartItemsContext } from "@/context/CartContext";
import toast from "react-hot-toast";
import PostReview from "../reviews/PostReview";
import Reviews from "../reviews/Reviews";
import { UserType } from "../modals/ProfileModal";
import Image from "next/image";

const StarRatings = dynamic(() => import("react-star-ratings"), {
    ssr: false,
});

interface IProductDetailsProps {
    product: IProduct,
    user: UserType
}

const ProductDetails: FC<IProductDetailsProps> = ({ product, user }: IProductDetailsProps) => {

    const [imagePreview, setImagePreview] = useState(product.images.length > 0 ? product.images[0].url : "/placeholder.jpg")

    const { addToCart } = useContext(CartItemsContext)

    const breadcrumbs = [
        { name: "Home", path: "/" },
        { name: `${product.name}`, path: `/products/${product._id}` }
    ]

    const handleAddToCart = () => {
        const itemToAdd: CartItemType = {
            id: product._id,
            image: product.images.length > 0 ? product.images[0].url : "/placeholder.jpg",
            name: product.name,
            price: product.price,
            seller: product.seller,
            stock: product.stock,
            quantity: 0
        }
        addToCart(itemToAdd)
        toast.success(`${product.name} added to cart`)
    }

    const reviewAllowed = user ?
        product.productreviews?.some((pr: ReviewType) => pr.user._id === user._id) : true

    return (
        <div className="p-3">
            <Breadcrums breadcrums={breadcrumbs} />
            <div className="card card-side bg-base-100 shadow-md">
                <figure className="flex flex-col w-2/6">
                    <Image src={imagePreview} alt="product" height={100} width={100}/>

                    <div className="flex items-center justify-center p-3">
                        {product.images.map(i => (
                            <a key={i?.public_id} className="inline-block border border-gray-100 p-1 rounded-lg
                             hover:border-blue-400 cursor-pointer" onClick={() => setImagePreview(i.url)}
                            >
                                <Image className="h-16 w-16" src={i.url} alt="product" height={80} width={80} />
                            </a>
                        ))}
                    </div>
                </figure>
                <div className="card-body w-4/6 gap-7">
                    <div className="flex flex-col gap-2">
                        <h2 className="card-title">{product.name}</h2>
                        <p>{product.description}</p>

                        <h3 className='my-3 font-semibold'>Rs.{product.price}</h3>
                    </div>

                    <div className="flex">
                        <StarRatings rating={product?.ratings}
                            numberOfStars={5}
                            starRatedColor="#ffab04"
                            starSpacing="1px"
                            starDimension="20px"
                            name="ratings"
                        />
                        <div className="text-xs font-medium m-1">{product?.ratings}</div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h5 className="font-medium">Category: <span className="font-normal text-neutral-500 text-sm">{product.category}</span></h5>
                        <h5 className="font-medium">On Stock:
                            <span className={`badge font-normal px-2 ml-1
                            ${product.stock > 3 ? 'bg-green-600 text-neutral-100' : "badge-ghost"}
                        `}>
                                {product.stock > 3 ? "Availabel" : "Out of stoc"}
                            </span>
                        </h5>
                        <h5 className="font-medium">Brand/Seller: <span className="font-normal text-neutral-500 text-sm">{product.seller}</span></h5>
                    </div>

                    <div className="card-actions">
                        <button className="btn bg-black text-white rounded-full hover:bg-neutral-600" onClick={handleAddToCart}>Add to cart</button>
                    </div>
                </div>
            </div>
            {!reviewAllowed &&
                <PostReview product={product} />
            }
            {product.productreviews.length > 0 &&
                <Reviews reviews={product.productreviews} />
            }
        </div>
    )
}

export default ProductDetails;