import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Enter product name"] },
    description: { type: String, required: [false, "Enter product description"] },
    price: { type: Number, required: [true, "Enter product price"] },
    images: [
        {
            public_id:{ type: String },
            url: { type: String }
        }
    ],
    category: { 
        type: String, 
        required: [true, "Select product category"],
        enum: {
            values: [
                "Footwear",
                "Fragrances",
                "Hobbies",
                "Haircare",
                "Skincare"
            ]
        },
        message: "Select a category"
    },
    stock: { type: Number, required: [true, "Enter products on stock"] },
    seller: { type: String, required: [true, "Enter product seller"] },
    ratings: { type: Number, default: 0},
    productreviews: [
        {
            comment: { type: String, required: true},
            ratings: { type: Number, required: true },
            createdAt: { type: Date, default: Date.now}
        }
    ],
    createdAt: { type: Date, default: Date.now}
})

export default mongoose.models.Product || mongoose.model("Product", productSchema)