import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Form } from "react-router";
import { getFormData, saveFormData } from "~/utils/clientSessionStorage";
import { useNavigate } from "react-router";
import { schema } from "~/utils/schema";

export function meta() {
  return [
    { title: "チェックアウト | React Router Shop" },
    { name: "description", content: "チェックアウト" },
  ];
}

export default function Checkout() {
  const userInfo = getFormData();
  const navigate = useNavigate();
  const [form, fields] = useForm({
    defaultValue: userInfo,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: "onBlur",
    onSubmit(event) {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const submission = parseWithZod(formData, { schema });
      if (submission.status === "success") {
        saveFormData(submission.value);
        navigate("/checkout/confirm");
      }
    },
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
            <label htmlFor={fields.email.id}>メールアドレス</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              {...getInputProps(fields.email, { type: "email" })}
            />
            <div>{fields.email.errors}</div>
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
