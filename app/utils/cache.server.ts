import { createClient } from "redis";

let client: ReturnType<typeof createClient>;

declare global {
  var __redis: ReturnType<typeof createClient> | undefined;
}

// 開発環境でのHMR対策
if (process.env.NODE_ENV === "production") {
  client = createClient({ url: process.env.REDIS_URL });
  client.connect();
} else {
  if (!global.__redis) {
    global.__redis = createClient({ url: process.env.REDIS_URL });
    global.__redis.connect().catch((err) => {
      console.error("Redis接続エラー:", err);
    });
  }
  client = global.__redis;
}

// Redis接続状態の監視
client.on("error", (err) => {
  console.error("Redisエラー:", err);
});

client.on("connect", () => {
  console.log("Redisに接続しました");
});

export { client };

export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const value = await client.get(key);
    if (value) {
      return JSON.parse(value) as T;
    }
    return null;
  } catch (error) {
    console.error("キャッシュ取得エラー:", error);
    return null;
  }
}

export async function setCache<T>(
  key: string,
  value: T,
  expireInSeconds = 60,
): Promise<void> {
  try {
    await client.set(key, JSON.stringify(value), {
      EX: expireInSeconds,
    });
  } catch (error) {
    console.error("キャッシュ保存エラー:", error);
  }
}
