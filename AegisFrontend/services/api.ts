import { getToken } from "./storage";

const API_URL = "http://192.168.100.65:3000/api";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = await getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Ocurrió un error en la solicitud.");
  }

  return data;
}
