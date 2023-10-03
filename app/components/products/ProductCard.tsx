"use client"

import { IProduct } from "@/models/product";
import { FC, useContext } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { CartItemType, CartItemsContext } from "@/context/CartContext";
import toast from "react-hot-toast";

const StarRatings = dynamic(() => import("react-star-ratings"), {
    ssr: false,
});

interface IProductCardProps {
    product: IProduct
}

const ProductCard: FC<IProductCardProps> = ({ product }) => {

    const { addToCart } = useContext(CartItemsContext)

    const handleAddToCart = () => {
        const itemToAdd: CartItemType = {
            id: product._id,
            image: product.images.length > 0 ? product.images[0].url : "/placeholder.jpg",
            name: product.name,
            price: product.price,
            seller: product.seller,
            stock: product.stock,
            quantity: 1
        }
        addToCart(itemToAdd)
        toast.success(`${product.name} added to cart`)
    }

    return (
        <div className="card card-side bg-base-100 shadow-xl mb-5">
            <figure className="h-48 w-48">
                <img src={product.images.length > 0 ? product.images[0].url : "/placeholder.jpg"} alt="product" />
            </figure>
            <div className="card-body flex-row justify-between">
                <div className="flex flex-col justify-center">
                    <h2 className="card-title">
                        <Link href={`/products/${product._id}`} className="text-lg font-bold hover:text-neutral-400">
                            {product.name}
                        </Link>
                    </h2>
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
                    <div className="text-sm">{product?.description}</div>
                </div>

                <div className="flex flex-col items-end justify-center gap-2">
                    <div className="badge badge-ghost p-4">Free Shipping</div>
                    <div className="text-md text-lg font-semibold">€{product.price}</div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={handleAddToCart}>Add to cart</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductCard