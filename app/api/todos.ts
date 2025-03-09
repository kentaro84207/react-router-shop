const ENDPOINT = 'https://hono-api-sample.kentaro84207.workers.dev';


// TODOアイテムのインターフェース
export interface TodoItem {
  id: string;
  title: string;
  status: 'todo' | 'doing' | 'done';
  createdAt: string;
  updatedAt: string;
}

// レスポンスのインターフェース（複数のTODOアイテム用）
export type TodoResponse = TodoItem[];

// 全てのTODOを取得
export async function getTodos(): Promise<TodoResponse> {
  const response = await fetch(`${ENDPOINT}/todos`);

  if (!response.ok) {
    throw new Error(`Failed to fetch todos: ${response.status}`);
  }

  return await response.json();
}

// 単一のTODOを取得
export async function getTodo(id: string): Promise<TodoResponse> {
  const response = await fetch(`${ENDPOINT}/todos/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch todo: ${response.status}`);
  }

  return await response.json();
}

// 新しいTODOを作成
export async function createTodo(title: string): Promise<TodoItem> {
  const response = await fetch(`${ENDPOINT}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create todo: ${response.status}`);
  }

  return await response.json();
}

// TODOを更新
export async function updateTodo(id: string, data: { title?: string; status?: 'todo' | 'doing' | 'done' }): Promise<TodoItem> {
  const response = await fetch(`${ENDPOINT}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update todo: ${response.status}`);
  }

  return await response.json();
}

// TODOを削除
export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${ENDPOINT}/todos/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete todo: ${response.status}`);
  }
}
