import { getSession, commitSession } from "~/utils/session.server";
import type { Route } from "./+types/confirm";
import { Form, redirect, Link } from "react-router";
import { getFormData, type OrderFormData } from "~/utils/clientSessionStorage";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta() {
  return [
    { title: "お支払い方法 | React Router Shop" },
    { name: "description", content: "お支払い" },
  ];
}

// ダミー送信処理
// 送信成功を返却する
const submit = async (orderFormData: OrderFormData) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!orderFormData) {
    return false;
  }
  return true;
};

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const orderFormData = JSON.parse(
    formData.get("orderFormData") as string,
  ) as OrderFormData;

  const success = await submit(orderFormData);
  if (!success) {
    return redirect("/checkout");
  }

  const session = await getSession(request.headers.get("Cookie"));
  session.unset("cart");

  return redirect("/checkout/complete", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Payment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<OrderFormData | null>(null);

  useEffect(() => {
    const data = getFormData();
    if (!data) {
      navigate("/checkout");
    } else {
      setFormData(data);
    }
  }, [navigate]);

  if (!formData) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">お支払い方法</h1>
      <Form method="post">
        <div className="space-y-4 mb-4">
          <div>
            <div className="font-medium">クレジットカード番号</div>
            <input type="text" />
          </div>
        </div>
        <input
          type="hidden"
          name="orderFormData"
          value={JSON.stringify(formData)}
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-600 cursor-pointer"
        >
          注文を確定する
        </button>
      </Form>
      <div className="mt-4 text-center">
        <Link to="/checkout" className="underline cursor-pointer">
          入力に戻る
        </Link>
      </div>
    </div>
  );
}
