// カート内のアイテムの型定義
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

// カート全体の型定義
export interface Cart {
  items?: CartItem[];
}
