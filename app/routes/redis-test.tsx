import { client, getCache, setCache } from "~/utils/cache.server";
import type { Route } from "./+types/redis-test";

export async function loader({ request }: Route.LoaderArgs) {
  const testKey = "test:connection";
  const timestamp = new Date().toISOString();

  // キャッシュから読み込み
  // "2025-03-09T07:01:24.419Z"
  const cached = await getCache(testKey);


  // キャッシュがない場合はRedisに保存
  if (!cached) {
    await setCache(testKey, { timestamp });
  }

  // Redis情報を取得
  const info = await client.info();

  return {
    status: "success",
    cached,
    redisInfo: info.split("\n").slice(0, 10),
    timestamp,
  };
}

export default function RedisTest({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>Redis接続テスト</h1>
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </div>
  );
}
