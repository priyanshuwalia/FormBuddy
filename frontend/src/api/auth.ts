import API from "./axios";

export const loginUser = (email: string, password: string)=>
        API.post("/auth/login", { email, password})

export const registerUser = (email: string, password: string) =>
  API.post("/auth/register", { email, password });