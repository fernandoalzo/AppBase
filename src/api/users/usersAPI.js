import { API_HOST } from "./../../utils/constants";

export async function getUsersInfo(token) {
  try {
    const url = `${API_HOST}/users/usersInfo`;
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

export async function getAllUsers(token) {
  try {
    const url = `${API_HOST}/users/findall`;
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

export async function getUserById(userId, token) {
  try {
    const url = `${API_HOST}/users/findone/${userId}`;
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

export async function createNewUser(userData, token) {
  try {
    const url = `${API_HOST}/users/create`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(userData),
    });
    const responseBody = await response.json();
    return { response, responseBody };
  } catch (error) {
    throw error;
  }
}

export async function updateUser(userId, newUserData, token) {
  try {
    const url = `${API_HOST}/users/update/${userId}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify(newUserData),
    });
    const responseBody = await response.json();
    return { response, responseBody };
  } catch (error) {
    throw error;
  }
}
