import {  Link } from "react-router";
import type { Route } from "./+types/complete";

export function meta() {
  return [
    { title: "完了 | React Router Shop" },
    { name: "description", content: "完了" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {}

export default function Complete() {
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">ご注文ありがとうございます</h1>
      <Link
        to="/"
        className="underline cursor-pointer"
      >
        トップページへ戻る
      </Link>
    </div>
  );
}
