import { redirect } from "react-router";
import { Form } from "react-router";
import { products } from "~/models/product";
import { getSession, commitSession } from "~/utils/session.server";
import type { Route } from "./+types/products";

export async function loader({ params, request }: Route.LoaderArgs) {
  const productId = params.id;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    throw new Response("商品が見つかりませんでした", { status: 404 });
  }

  // カート内の現在のアイテム数を取得
  const session = await getSession(request.headers.get("Cookie"));
  const cart = session.get("cart");
  const itemCount = cart?.items?.length || 0;

  return { product, itemCount };
}

export async function action({ params, request }: Route.ActionArgs) {
  const productId = params.id;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    throw new Response("商品が見つかりませんでした", { status: 404 });
  }

  const session = await getSession(request.headers.get("Cookie"));
  const cart = session.get("cart");

  // カートに商品を追加
  const cartItems = cart?.items || [];
  cartItems.push({
    productId: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
  });

  session.set("cart", { ...cart, items: cartItems });

  return redirect("/cart", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: data ? `${data.product.name} | React Router Shop` : "商品詳細" },
    { name: "description", content: data ? data.product.description : "" },
  ];
}

export default function Products({ loaderData }: Route.ComponentProps) {
  const { product, itemCount } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-gray-800 mb-4">
            {product.price.toLocaleString()}円
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <Form method="post">
            <button
              type="submit"
              className="cursor-pointer bg-black hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              カートに追加
            </button>
          </Form>

          <div className="mt-6">
            <a href="/" className="text-black hover:underline">
              ← 商品一覧に戻る
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
