import * as Yup from "yup";

export function updateUserSchema() {
  return {
    username: Yup.string().required("El Username es obligatorio"),
    email: Yup.string().required("El Correo el obligatorio"),
    cellPhone: Yup.string().required("El Telefono el obligatorio"),
    roleId: Yup.number()
      .integer()
      .required("el role del usuario es obligatorio"),
    enabled: Yup.boolean(),
    password: Yup.string().notRequired(),
    passwordConfirm: Yup.string().notRequired(),
  };
}
