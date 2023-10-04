import mongoConnect from "@/lib/mongoConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    await mongoConnect()

    const body = await request.json()
    const { name, email, password } = body
    
    const user = await User.create({ name, email, password })

    return NextResponse.json(user)
}