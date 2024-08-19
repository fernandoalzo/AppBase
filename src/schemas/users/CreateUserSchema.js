import * as Yup from "yup";

export function createUserSchema() {
  return {
    username: Yup.string().required("El Username es obligatorio"),
    documentId: Yup.number().required("El Documento es obligatorio"),
    email: Yup.string().required("El Correo es obligatorio"),
    phone: Yup.string().required("El Telefono el obligatorio"),
    password: Yup.string().required("La contraseña el obligatorio"),
    passwordConfirm: Yup.string().required(
      "La confirmacion de la contraseña es obligatorio"
    ),
    address: Yup.string().required("La direccion es obligatoria"),
    roleId: Yup.number()
      .integer()
      .required("el role del usuario es obligatorio"),
  };
}
