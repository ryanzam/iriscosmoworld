import { NextRequest, NextResponse } from "next/server"
import mongoConnect from "@/lib/mongoConnect"
import { ObjectId } from "mongodb";
import User from "@/models/user";

export async function GET(request: NextRequest) {
    await mongoConnect()

    const params: URLSearchParams = request.nextUrl.searchParams

    const us = params.get("us")

    const userFound = await User.findOne({ uniqueString: us });

    if(userFound.emailVerified) {
        return NextResponse.error()
    }

    if (userFound && !(userFound.emailVerified)) {
        userFound.emailVerified = true
        await User.findOneAndUpdate({ _id: new ObjectId(userFound._id) }, { $set: userFound })
        return NextResponse.redirect(`${process.env.BASE_URL}/user`)
    }

    return NextResponse.error()
}