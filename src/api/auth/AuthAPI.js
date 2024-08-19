import { API_HOST } from "./../../utils/constants";

export async function getLogin(data) {
  try {
    const url = `${API_HOST}/auth/login`;
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    const responseBody = await response.json();
    return { response, responseBody };
  } catch (error) {
    throw error;
  }
}
