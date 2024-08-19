import { API_HOST } from "./../../utils/constants";

export async function getAllRoles(token) {
  try {
    const url = `${API_HOST}/roles/findall`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseBody = await response.json();
    return { response, responseBody };
  } catch (error) {
    throw error;
  }
}
