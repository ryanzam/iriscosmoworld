import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

    const url = request.nextUrl.pathname;
    
    if (url.startsWith("/api")) {
        NextResponse.next().headers.append("Access-Control-Allow-Origin", "*")
        NextResponse.next().headers.append("Content-Type", "application/json")
    }
}


export const config = {
    matcher: [
        "/user",
        "/delivery",
        "/checkout",
        "/admin/:path*"
    ]
}