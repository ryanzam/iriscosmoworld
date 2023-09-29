"use client"

import { IProduct } from "@/models/product";
import { FC } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";

const StarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
});

interface IProductCardProps {
    product: IProduct
}

const ProductCard: FC<IProductCardProps> = ({ product }) => {
    return (
        <div className="card bg-base-100 shadow-md grid border mb-5 grid-cols-[250px_1.5fr_.5fr]">
            <figure>
                <Image alt="product"
                    src={product.images.length > 0 ? product.images[0].url : "/placeholder.jpg"} 
                    height={200}
                    width={200}
                />
            </figure>

            <div className="flex flex-col items-start justify-center gap-3">
                <Link href={`/products/${product._id}`} className="text-lg font-bold hover:text-neutral-400">{product.name}</Link>
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

            <div className="flex flex-col items-start justify-center gap-2">
                <div className="text-green-600">Free Shipping</div>
                <div className="text-md text-lg font-semibold">€{product.price}</div>
                <div className="">
                    <button className="btn btn-primary">Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard