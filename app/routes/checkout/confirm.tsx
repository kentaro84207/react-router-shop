import { Link } from "react-router";
import { getFormData, type OrderFormData } from "~/utils/clientSessionStorage";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta() {
  return [
    { title: "確認画面 | React Router Shop" },
    { name: "description", content: "確認画面" },
  ];
}

export default function Confirm() {
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

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">入力内容の確認</h1>
      <div className="space-y-4 mb-4">
        <div>
          <div className="font-medium">お名前</div>
          <div className="mt-1">{formData?.name}</div>
        </div>
        <div>
          <div className="font-medium">メールアドレス</div>
          <div className="mt-1">{formData?.email}</div>
        </div>
        <div>
          <div className="font-medium">住所</div>
          <div className="mt-1">{formData?.address}</div>
        </div>
      </div>
      <Link to="/checkout/payment">
        <button
          type="button"
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-600 cursor-pointer"
        >
          お支払い方法へ進む
        </button>
      </Link>
      <div className="mt-4 text-center">
        <Link to="/checkout" className="underline cursor-pointer">
          入力に戻る
        </Link>
      </div>
    </div>
  );
}
