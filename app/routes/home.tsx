import { Link } from "react-router";
import { products } from "~/models/product";
import { Popover, type PopoverHandle } from "~/ui/popover";
import { useRef } from "react";
import FocusLock, { AutoFocusInside } from "react-focus-lock";

export function meta() {
  return [
    { title: "商品一覧 | React Router Shop" },
    { name: "description", content: "React Router Shopの商品一覧ページです" },
  ];
}

// 使用例
export const PopoverExample: React.FC = () => {
  const popoverRef = useRef<PopoverHandle>(null);

  return (
    <>
      <Popover
        ref={popoverRef}
        id="navigation-popover"
        // trigger={<button className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer">メニューを開く</button>}
      >
        <div className="popover-content">
          <h3>ナビゲーション</h3>
          <nav>
            <ul>
              <li>
                <a href="/">ホーム</a>
              </li>
              <li>
                <a href="/about">会社概要</a>
              </li>
              <li>
                <a href="/services">サービス</a>
              </li>
              <li>
                <a href="/contact">お問い合わせ</a>
              </li>
            </ul>
          </nav>
          <button
            type="button"
            onClick={() => popoverRef.current?.hidePopover()}
          >
            閉じる
          </button>
        </div>
      </Popover>

      {/* 外部からのコントロール例 */}
      <div className="external-controls" style={{ marginTop: "20px" }}>
        <button
          type="button"
          onClick={() => popoverRef.current?.showPopover()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          ポップオーバーを開く
        </button>
        <button
          type="button"
          onClick={() => popoverRef.current?.hidePopover()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          ポップオーバーを閉じる
        </button>
      </div>
    </>
  );
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">商品一覧</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700">{product.price}円</p>
            </div>
          </Link>
        ))}
      </div>

      <PopoverExample />
    </div>
  );
}
