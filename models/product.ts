import mongoose from "mongoose";
import { Categories } from "./categories";

type IImage = {
    public_id: string;
    url: string;
}

export interface IProduct {
    _id: string;
    name: string;
    description?: string;
    price: number;
    images: Array<IImage>;
    category: string;
    stock: number;
    seller: string;
    ratings?: number;
    productreviews?: []
}

const productSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: false, ref: "User"},
    name: { type: String, required: [true, "Enter product name"] },
    description: { type: String, required: [false, "Enter product description"] },
    price: { type: Number, required: [true, "Enter product price"] },
    images: [
        {
            public_id: { type: String },
            url: { type: String }
        }
    ],
    category: {
        type: String,
        required: [true, "Select product category"],
        enum: {
            values: Categories
        },
        message: "Select a category"
    },
    stock: { type: Number, required: [true, "Enter products on stock"] },
    seller: { type: String, required: [true, "Enter product seller"] },
    ratings: { type: Number, default: 0 },
    productreviews: [
        {
            comment: { type: String, required: true },
            ratings: { type: Number, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ],
}, {
    timestamps: true
})

export default mongoose.models.Product || mongoose.model("Product", productSchema)