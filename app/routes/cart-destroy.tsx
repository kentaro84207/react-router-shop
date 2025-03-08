import { getSession } from "~/utils/session.server";
import type { Cart } from "~/types/cart";
import type { Route } from "./+types/cart";
import { redirect } from "react-router";
import { commitSession } from "~/utils/session.server";

export async function action({ params, request }: Route.ActionArgs) {
  const productId = params.productId;
  const session = await getSession(request.headers.get("Cookie"));
  const cart: Cart = session.get("cart") || { items: [] };

  // カート内の商品を削除
  const cartItems = cart?.items || [];
  const updatedCartItems = cartItems.filter(
    (item) => item.productId !== productId,
  );
  session.set("cart", { ...cart, items: updatedCartItems });

  return redirect("/cart", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
