import mongoConnect from "@/lib/mongoConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { RandomString } from "@/utils/stringGenerator";
import { emailVerification } from "@/utils/mailer";

export async function POST(request: Request) {
    try {
        await mongoConnect()

        const body = await request.json()
        const { name, email, password } = body

        const userFound = await User.findOne({ email });
        if (userFound) {
            return NextResponse.json(
                { message: "Email already exists" }, { status: 500});
        }

        const uniqueString = RandomString();
        const user = new User({
            name,
            email,
            password: password,
            uniqueString
        });

        const savedUser = await user.save();
        await emailVerification(email, uniqueString)
        return NextResponse.json(
            {
                name: savedUser.name,
                email: savedUser.email,
                createdAt: savedUser.createdAt,
                updatedAt: savedUser.updatedAt,
            });
    } catch (error) {
        return NextResponse.json({message: error}, {status: 500})
    }
}