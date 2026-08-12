import { apiFetch } from "./api";
import { getToken, removeToken, saveToken } from "./storage";

interface LoginResponse {
  access_token: string;
}

export async function login(email: string, password: string) {
  const data = (await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  })) as LoginResponse;

  await saveToken(data.access_token);

  return data;
}

export async function getStoredToken() {
  return getToken();
}

export async function logout() {
  await removeToken();
}
