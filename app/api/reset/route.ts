import { NextRequest, NextResponse } from 'next/server'
import User from "@/models/user";
import { RandomString } from "@/utils/stringGenerator";
import mongoConnect from '@/lib/mongoConnect';
import { emailResetPassword } from '@/utils/mailer';

export async function GET(request: NextRequest) {
    await mongoConnect()

    const params: URLSearchParams = request.nextUrl.searchParams
    const us = params.get("us")

    //const userFound = await User.findOne({ resetPasswordString: us });
    const userFound = { email: "ray@ray.com" }
    if (userFound && userFound?.email) {
        return NextResponse.redirect(`${process.env.BASE_URL}/passwordChange`)
    }

    return NextResponse.error()
}

export async function POST(request: NextRequest) {
    await mongoConnect()

    const { email } = await request.json();

    //const user = await User.findOne({ email });
    const user = { email: "ray@ray.com", resetPasswordString: "" }

    if (user) {
        const passwordResetString = RandomString()

        user.resetPasswordString = passwordResetString
        //await user.save();
        console.log("============>>>> " + user)
        await emailResetPassword(email, passwordResetString);

        return NextResponse.json({
            message: 'A password reset link has been sent to your email.'
        })
    }
    return NextResponse.error()
};
