import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Form, useActionData, data, redirect } from "react-router";
import { z } from "zod";
import { commitSession, getSession } from "~/utils/session.server";
import type { Route } from "./+types/checkout";
import type { UserInfo } from "~/types/user";

const schema = z.object({
  name: z.string().min(1, "名前を入力してください"),
  address: z.string().min(1, "住所を入力してください"),
});

export function meta() {
  return [
    { title: "チェックアウト | React Router Shop" },
    { name: "description", content: "チェックアウト" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userInfo: UserInfo = session.get("userInfo");

  return { userInfo };
}

export default function Checkout({ loaderData }: Route.ComponentProps) {
  const { userInfo } = loaderData;
  const lastResult = useActionData<typeof action>();
  const [form, fields] = useForm({
    defaultValue: userInfo,
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">お客様情報入力</h1>
      <Form method="post" {...getFormProps(form)}>
        <div className="space-y-4">
          <div>
            <label htmlFor={fields.name.id}>氏名</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              {...getInputProps(fields.name, { type: "text" })}
            />
            <div>{fields.name.errors}</div>
          </div>
          <div>
            <label htmlFor={fields.address.id}>住所</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              {...getInputProps(fields.address, { type: "email" })}
            />
            <div>{fields.address.errors}</div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-600 cursor-pointer"
          >
            確認画面へ
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  session.set("userInfo", submission.value);

  return redirect("/checkout/confirm", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
