import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    phone: { type: String, required: true},
    street: { type: String, required: true},
    city: { type: String, required: true},
    postalCode: { type: String, required: true},
    country: { type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    timestamps: true
});

export default mongoose.models.Address || mongoose.model("Address", addressSchema)