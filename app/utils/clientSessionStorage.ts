export type OrderFormData = {
  name: string;
  email: string;
  address: string;
};

export const saveFormData = (formData: Partial<OrderFormData>) => {
  if (typeof window !== "undefined") {
    const existingData = sessionStorage.getItem("formData");
    const parsedData = existingData ? JSON.parse(existingData) : {};
    const updatedData = { ...parsedData, ...formData };
    sessionStorage.setItem("formData", JSON.stringify(updatedData));
  }
};

export const getFormData = (): OrderFormData | undefined => {
  if (typeof window !== "undefined") {
    const data = sessionStorage.getItem("formData");
    return data ? JSON.parse(data) : undefined;
  }
  return undefined;
};

export const clearFormData = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("formData");
  }
};
