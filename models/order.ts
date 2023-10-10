import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    deliveryInfo: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Address" },
    orderItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String },
            quantity: { type: Number, required: true },
        },
    ],
    paymentInfo: {
        id: { type: String, required: true },
        paidTax: { type: Number, required: true },
        paidAmount: { type: Number, required: true },
        paymentStatus: { type: String, required: true }
    },
    orderStatus: { type: String, default: "Pending" }
},
    { timestamps: true })

export default mongoose.models.Order || mongoose.model("Order", orderSchema);