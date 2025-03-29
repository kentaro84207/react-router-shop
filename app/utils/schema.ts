import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, "名前を入力してください"),
  address: z.string().min(1, "住所を入力してください"),
  email: z.string().email("メールアドレスを入力してください"),
});
