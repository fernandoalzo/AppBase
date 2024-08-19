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
