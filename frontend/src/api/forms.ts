import API from "./axios";
import type { Form } from "../types/form";

export type { Form } from "../types/form";

export const getUserForms = async (): Promise<Form[]> => {
  try {
    const response = await API.get("/forms/dashboard");
    return response.data;
  } catch (error) {
    console.error("Error fetching user forms:", error);
    throw error;
  }
};

export const getFormResponses = async (formId: string) => {
  try {
    const response = await API.get(`/response/${formId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching responses:", error);
    throw error;
  }
};
