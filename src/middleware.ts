import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    // クッキーを取得
    let cookie = request.cookies.get("nextjs");
    console.log("Request Cookie:", cookie); // サーバーのコンソールに出力

    const allCookies = request.cookies.getAll();
    console.log("All Request Cookies:", allCookies); // サーバーのコンソールに出力

    request.cookies.has("nextjs"); // => true
    request.cookies.delete("nextjs");
    request.cookies.has("nextjs"); // => false

    // レスポンスにクッキーを設定
    const response = NextResponse.next();
    response.cookies.set("vercel", "fast");
    response.cookies.set({
        name: "vercel",
        value: "fast",
        path: "/",
    });
    cookie = response.cookies.get("vercel");
    console.log("Response Cookie:", cookie); // サーバーのコンソールに出力

    return response;
}

export const config = {
    matcher: ["/:path*"],
};
