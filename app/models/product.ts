export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "スニーカー",
    price: 12800,
    description: "快適な履き心地のスニーカー",
    imageUrl: "https://placehold.co/600x400?text=sneaker",
  },
  {
    id: "2",
    name: "バックパック",
    price: 9800,
    description: "多機能なバックパック",
    imageUrl: "https://placehold.co/600x400?text=backpack",
  },
  {
    id: "3",
    name: "腕時計",
    price: 15000,
    description: "シンプルでスタイリッシュな腕時計",
    imageUrl: "https://placehold.co/600x400?text=watch",
  },
  {
    id: "4",
    name: "サングラス",
    price: 6500,
    description: "UVカット機能付きのサングラス",
    imageUrl: "https://placehold.co/600x400?text=sunglasses",
  },
];
