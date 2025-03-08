import { createCookieSessionStorage } from "react-router";

// セッションストレージの作成
const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "react_router_shop_cart",
      secure: process.env.NODE_ENV === "production",
      secrets: ["cart-session-secret"], // 実際の環境では環境変数から取得するべき
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30日間
      httpOnly: true,
    },
  });

export { getSession, commitSession, destroySession };
