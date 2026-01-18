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
