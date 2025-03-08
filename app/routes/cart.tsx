import { Link } from "react-router";
import { getSession } from "~/utils/session.server";
import type { Cart as CartType, CartItem } from "~/types/cart";
import type { Route } from "./+types/cart";
import { useFetcher } from "react-router";

export function meta() {
  return [
    { title: "ショッピングカート | React Router Shop" },
    { name: "description", content: "カート内の商品をご確認ください。" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const cart: CartType = session.get("cart") || { items: [] };
  return { cart };
}

export default function Cart({ loaderData }: Route.ComponentProps) {
  const { cart } = loaderData;
  const cartItems = cart.items || [];
  const isEmpty = cartItems.length === 0;
  const fetcher = useFetcher();

  // 合計金額の計算
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ショッピングカート</h1>

      {isEmpty ? (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600 mb-6">カートは空です</p>
          <Link
            to="/"
            className="bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
          >
            買い物を続ける
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {/* カート内の商品リスト */}
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item: CartItem) => (
                <li key={item.productId} className="py-6 flex">
                  <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                    <img
                      src={`https://placehold.co/600x400?text=itemId:${item.productId}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-6 flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <p className="ml-4 text-lg font-medium text-gray-900">
                        {item.price.toLocaleString()}円
                      </p>
                    </div>
                    <div className="mt-2 flex items-center">
                      <span className="text-gray-500">数量:</span>
                      <span className="ml-2 text-gray-800">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <div className="mt-2 text-gray-600">
                        小計: {(item.price * item.quantity).toLocaleString()}円
                      </div>
                      <fetcher.Form
                        key={item.productId}
                        method="post"
                        action={`/cart/${item.productId}/destroy`}
                      >
                        <button
                          type="submit"
                          className="underline cursor-pointer"
                        >
                          削除
                        </button>
                      </fetcher.Form>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/3">
            {/* 合計金額 */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-xl font-bold mb-4">合計金額</p>
              <p className="text-2xl font-semibold text-gray-800">
                {totalPrice.toLocaleString()}円
              </p>
              <Link
                to="/checkout"
                className="block mt-6 bg-black text-white text-center font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
              >
                レジに進む
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
