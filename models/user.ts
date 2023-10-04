import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Enter your name"] },
    email: { type: String, required: [true, "Enter your email"], unique: true },
    password: {
        type: String, required: [true, "Enter your password"],
        minLength: [8, "Password must be minimun 8 characters long"], select: false
    },
    phone: String,
    avatar: { public_id: String, url: String },
    role: { type: String, default: "user" }
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 8)
})

export default mongoose.models.User || mongoose.model("User", userSchema)