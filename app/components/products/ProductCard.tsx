"use client"

import { IProduct } from "@/models/product";
import { FC, useContext } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { CartItemType, CartItemsContext } from "@/context/CartContext";
import toast from "react-hot-toast";
import Image from "next/image";
import { motion } from "framer-motion";

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
        <motion.div
            whileHover={{
                boxShadow: "0px 0px 10px 0px #cd35ff",
                scale: 0.98,
                transition: {
                    duration: 0.2,
                    ease: "easeInOut"
                }
            }}
            className="card bg-base-200 shadow-xl mb-5 hover:bg-neutral-100"
        >
            <figure className="relative h-full w-full">
                <Image src={product.images.length > 0 ? product.images[0].url : "/placeholder.jpg"}
                    alt="product"
                    className="object-contain"
                    height={"192"} width={"300"} />
            </figure>
            <div className="card-body p-3">
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

                <div className="text-sm md:w-4/5 xs:hidden">{product?.description?.substring(0, 50) + "..."}</div>

                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-md text-lg font-semibold">
                            Rs.{product.price}
                            <span className="text-sm text-neutral-500 line-through ml-2">Rs.{Math.ceil(product.price + product.price * .05)}</span>
                        </div>
                        <div className="badge">Free Delivery</div>
                    </div>
                    <div className="card-actions">
                        <button className="btn bg-black text-white rounded-full hover:bg-neutral-600" onClick={handleAddToCart}>
                            Add to cart
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard