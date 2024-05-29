import mongoose from "mongoose"
import bcrypt from "bcryptjs"

export function validateEmail(email: string) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Enter your name"] },
    email: {
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        type: String, require: true, index: true, unique: true
    },
    emailVerified: { type: Boolean, default: false },
    image: { type: String },
    password: {
        type: String,
        minLength: [8, "Password must be minimun 8 characters long"], select: false
    },
    role: { type: String, default: "user" },
    uniqueString: { type: String },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date }
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    const user = this
    if (!this.isModified("password")) {
        next()
    }
    const pass = this.password ?? ""
    this.password = await bcrypt.hash(pass, 8)
})

export default mongoose.models.User || mongoose.model("User", userSchema)