import * as Yup from "yup";

export function updateUserSchema() {
  return {
    username: Yup.string().required("El Username es obligatorio"),
    email: Yup.string().required("El Correo el obligatorio"),
    phone: Yup.string().required("El Telefono el obligatorio"),
    address: Yup.string().required("La direccion es obligatoria"),
    roleId: Yup.number()
      .integer()
      .required("el role del usuario es obligatorio"),
    enabled: Yup.boolean(),
    password: Yup.string().notRequired(),
    passwordConfirm: Yup.string().notRequired(),
  };
}
