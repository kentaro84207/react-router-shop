import { getSession, commitSession } from "~/utils/session.server";
import type { Route } from "./+types/confirm";
import { Form, redirect, Link } from "react-router";

export function meta() {
  return [
    { title: "確認画面 | React Router Shop" },
    { name: "description", content: "確認画面" },
  ];
}

// ダミー送信処理
// 送信成功を返却する
const submit = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return true;
};

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userInfo = session.get("userInfo");
  return { userInfo };
}

export async function action({ request }: Route.ActionArgs) {
  // ダミー送信処理
  const success = await submit();
  if (!success) {
    return redirect("/checkout");
  }

  const session = await getSession(request.headers.get("Cookie"));
  session.unset("cart");
  session.unset("userInfo");

  return redirect("/checkout/complete", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Confirm({ loaderData }: Route.ComponentProps) {
  const { userInfo } = loaderData;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">入力内容の確認</h1>
      <div className="space-y-4 mb-4">
        <div>
          <div className="font-medium">お名前</div>
          <div className="mt-1">{userInfo.name}</div>
        </div>
        <div>
          <div className="font-medium">住所</div>
          <div className="mt-1">{userInfo.address}</div>
        </div>
      </div>
      <Form method="post">
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
