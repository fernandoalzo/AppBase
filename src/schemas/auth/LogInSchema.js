import * as Yup from "yup";

export function LogInSchema() {
  return {
    username: Yup.string().required("El Correo es obligatorio."),
    password: Yup.string()
      .required("La contraseña es obligatoria.")
      .min(8, "La contraseña debe tener mas de 8 caracteres"),
  };
}
