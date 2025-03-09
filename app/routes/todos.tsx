import { client, getCache, setCache } from "~/utils/cache.server";
import type { Route } from "./+types/todos";
import { getTodos } from "~/api/todos";
import type { TodoResponse } from "~/api/todos";

export async function loader({ request }: Route.LoaderArgs) {
  const todosKey = "todos-key";
  const timestamp = new Date().toISOString();
  const info = await client.info();

  const cachedTodos = await getCache<TodoResponse>(
    todosKey,
  );

  if (cachedTodos) {
    return {
      status: "success",
      todos: cachedTodos,
      redisInfo: info.split("\n").slice(0, 10),
      timestamp,
      cached: true,
    };
  }

  const todos = await getTodos();
  await setCache(todosKey, todos);

  return {
    status: "success",
    todos,
    redisInfo: info.split("\n").slice(0, 10),
    timestamp,
    cached: false,
  };
}

export default function Todos({ loaderData }: Route.ComponentProps) {
  const { todos, timestamp, cached } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">TODO一覧</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="border rounded-lg overflow-hidden shadow-md transition-shadow duration-300"
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{todo.title}</h2>
              <p className="text-gray-700">
                {todo.status === "done" ? "完了" : "未完了"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">取得時刻</h2>
        <p>{cached ? "キャッシュあり" : "キャッシュなし"}</p>
        <p>{timestamp}</p>
      </div>
    </div>
  );
}
