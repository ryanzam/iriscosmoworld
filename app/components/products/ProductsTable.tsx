"use client"

import { data } from "@/app/products/Products"
import { FC, useEffect, useState } from "react"
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import Pagination from "../Pagination"
import ProductModal from "../modals/ProductModal"
import { IProduct } from "@/models/product"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import ProductStats from "../stats/ProductStats"
import Image from "next/image"
import { PROD_URL } from "@/app/(root)/page"

interface IProductsTableProps {
    data: data
}

const ProductsTable: FC<IProductsTableProps> = ({ data }: IProductsTableProps) => {

    const [showProductModal, setShowProductModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<IProduct>()

    const router = useRouter()

    const onClickProduct = () => {
        setShowProductModal(true)
    }

    const onCloseProductModal = (reload: boolean = false) => {
        setShowProductModal(false)
        setSelectedProduct(undefined)
        if (reload) {
            router.refresh()
        }
    }

    const onEditProduct = (product: any) => {
        setSelectedProduct(product)
        setShowProductModal(true)
    }

    const onDeleteProduct = (id: string) => {
        const confirm = window.confirm("Are you sure, you want to delete this product?")
        if (!confirm)
            return

        let productPromise = axios.delete(`${PROD_URL}/api/products/` + id)
        toast.promise(productPromise, {
            loading: "Deleting product",
            success: () => {
                router.refresh()
                return "Product deleted"
            },
            error: "Error while deleting product"
        })
    }

    return (
        <div className="">
            {showProductModal &&
                <ProductModal title={!selectedProduct ? "Add new product" : "Edit product"}
                    isOpen={showProductModal} onClose={(e) => onCloseProductModal(e)}
                    product={selectedProduct}
                />
            }

            <ProductStats data={data} />

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>On Stock</th>
                        <th>
                            <button className="btn btn-outline btn-primary btn-sm mt-5" onClick={onClickProduct}>
                                Add product
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.products.map(p => (
                        <tr key={p._id}>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <Image
                                                src={p.images.length > 0 ? p.images[0].url : "/placeholder.jpg"}
                                                alt="product image" 
                                                height={48}
                                                width={48}/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{p.name}</div>
                                        <span className="badge badge-ghost badge-sm">By {p.seller}</span>
                                    </div>
                                </div>
                            </td>
                            <td>{p.category}</td>
                            <td>Rs.{p.price}</td>
                            <td>{p.stock}</td>
                            <td className="join join-vertical lg:join-horizontal">
                                <button className="btn join-item btn-ghost" title="Edit product"
                                    onClick={() => onEditProduct(p)}>
                                    <AiOutlineEdit size={18} />
                                </button>
                                <button className="btn join-item btn-ghost" title="Delete product"
                                    onClick={() => onDeleteProduct(p._id)}
                                >
                                    <AiOutlineDelete size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr><th>Total products: {data?.total}</th></tr>
                </tfoot>
            </table>
            <div className="mt-3">
                <Pagination total={data.total} pageSize={data.pageSize} />
            </div>
        </div>
    )
}

export default ProductsTable