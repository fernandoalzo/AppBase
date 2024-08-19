import { jwtDecode } from "jwt-decode";
import { getValidateJWT } from "./../api/utils/UtilsAPI";

// Función para dar formato al número con puntos para miles o millones
export function formatNumberForInput(number) {
  return number.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export function unformatNumber(formattedNumber) {
  return formattedNumber.replace(/\./g, "");
}

export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
  return `${year}-${month}-${day}`;
}

export function formatNumberForOutput(number) {
  if (number === null || number === undefined) {
    return "";
  }
  const numericValue = number.toString().replace(/\D/g, "");
  return `$ ${numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

export function getCurrentDate() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getDatefromToday(daysFromToday) {
  const currentDate = new Date();

  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() + daysFromToday);

  const year = futureDate.getFullYear();
  const month = String(futureDate.getMonth() + 1).padStart(2, "0");
  const day = String(futureDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getDatefromTodayBack(daysFromToday) {
  const currentDate = new Date();

  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - daysFromToday);

  const year = pastDate.getFullYear();
  const month = String(pastDate.getMonth() + 1).padStart(2, "0");
  const day = String(pastDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function decodeJWT(token) {
  try {
    console.log("Decodificando el Token");
    console.log(token);
    const tokenDecoded = jwtDecode(token);
    return tokenDecoded;
  } catch (error) {
    console.log("Error Decodificando el Token");
    console.log(error);
  }
}

export async function validateToken(authToken) {
  const rtaValidateToken = await getValidateJWT({ token: authToken });
  if (rtaValidateToken.response.status === 200) {
    return rtaValidateToken.responseBody.valid;
  }
  return false;
}
