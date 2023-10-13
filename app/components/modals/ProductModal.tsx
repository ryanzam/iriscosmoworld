"use client"

import { ChangeEventHandler, FC, useState } from "react"
import TextInput from "../inputs/TextInput"
import Modal from "./Modal";
import { BsSend } from "react-icons/bs"
import axios from "axios";
import toast from "react-hot-toast";
import { IProduct, ImageType } from "@/models/product";
import { Categories } from "@/models/categories";
import ImageUploads from "../inputs/ImageUploads";

interface IAddProductModalProps {
    title: string;
    isOpen: boolean;
    onClose: (refresh: boolean) => void;
    onSubmit?: () => void;
    product?: IProduct
}

const AddProductModal: FC<IAddProductModalProps> = ({ title, isOpen, onClose, product }) => {

    const [item, setItem] = useState({
        name: "" || product?.name,
        description: "" || product?.description,
        price: "" || product?.price,
        stock: "" || product?.stock,
        category: "" || product?.category,
        seller: "" || product?.seller,
        images: [{} as ImageType] as Array<ImageType> || product?.images[0]
    });

    const { name, description, price, stock, category, seller } = item

    const onChange = (e: any) => {
        e.preventDefault()
        setItem(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const onChangeImage = (val: string) => {
        setItem(prev => ({...prev, images: [{url: val}]}))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        let productPromise
        if (!product) {
            productPromise = axios.post(`/api/products`, item)
        } else {
            productPromise = axios.put(`/api/products`, { ...item, id: product?._id })
        }

        toast.promise(productPromise, {
            loading: "Submitting product",
            success: () => {
                onClose(true)
                return "Product saved"
            },
            error: "Error while saving product"
        })
    }

    const modalAddProductForm = (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <TextInput label="Enter Product name"
                id="name"
                placeHolder="Product Name"
                type="text"
                required={true}
                value={name}
                onChange={onChange}
            />
            <div >
                <label className="label">
                    <span className="label-text">Enter product description</span>
                </label>
                <textarea className="textarea textarea-bordered w-full"
                    placeholder="Product Description"
                    value={description}
                    onChange={onChange}
                    id="description"
                >
                </textarea>
            </div>
            <div className="flex justify-between">
                <TextInput label="Enter product price"
                    id="price"
                    placeHolder="Price"
                    type="number"
                    required={true}
                    value={price}
                    onChange={onChange}
                />
                <TextInput label="Enter product on stock"
                    id="stock"
                    placeHolder="Stock"
                    type="number"
                    required={true}
                    value={stock}
                    onChange={onChange}
                />
            </div>
            <div className="grid grid-cols-2 justify-between gap-5">
                <TextInput label="Enter seller"
                    id="seller"
                    required
                    placeHolder="Seller"
                    type="text"
                    value={seller}
                    onChange={onChange}
                />
                <div className="w-full">
                    <label className="label">
                        <span className="label-text">Select a category</span>
                    </label>
                    <select className="select select-bordered w-full" onChange={onChange} id="category" required>
                        <option value="">Select a category</option>
                        {Categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>
            <ImageUploads value={item?.images[0]?.url} onChange={(v) => onChangeImage(v)}/>
            <button className="btn btn-primary mt-3" type="submit" >
                <BsSend />
                Submit
            </button>
        </form>
    )

    return (
        <Modal isOpen={isOpen} title={title} modalBody={modalAddProductForm} onClose={() => onClose(false)} />
    )
}

export default AddProductModal