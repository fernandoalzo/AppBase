import React, { useState } from "react";
import {
  Modal,
  Button,
  FormControl,
  Input,
  ScrollView,
  Text,
  Switch,
  Radio,
  Icon,
  Stack,
} from "native-base";
import { useFormik } from "formik";
import * as Yup from "yup";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CustomDivider from "./../utils/Divisor";
import { updateUserSchema } from "./../../schemas/users/UpdateUserSchema";

export default function UserUpdateInfoModal({
  showModalUpdateInfo,
  setShowModalUpdateInfo,
  userInfo,
  rolesList,
  update,
  loadUserDetails,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(null);

  React.useEffect(() => {
    if (userInfo && userInfo.role) {
      formik.setValues({
        username: userInfo.username || "",
        email: userInfo.email || "",
        cellPhone: userInfo.cellPhone || "",
        roleId: userInfo.role.id || 1,
        enabled: userInfo.enabled || false,
      });
    }
  }, [userInfo]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      cellPhone: "",
      password: "",
      roleId: userInfo && userInfo.role ? userInfo.role.id : 1,
      enabled: false,
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object(updateUserSchema()),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      setIsSubmitting(true);
      setPasswordMatchError(null);
      try {
        if (
          formValues.password &&
          formValues.password !== formValues.passwordConfirm
        ) {
          setPasswordMatchError("Las contraseñas no coinciden");
          setIsSubmitting(false);
          return;
        }
        if (formValues.password === "") {
          delete formValues.password;
        }
        const { passwordConfirm, ...newUserData } = formValues;
        const rtaUpdateUser = await update(userInfo.id, newUserData);
        if (rtaUpdateUser.response.status === 200) {
          loadUserDetails(userInfo.id);
          setShowModalUpdateInfo(false);
        }
      } catch (error) {
        console.error("Error al abonar el payment", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <ScrollView>
      <Modal
        size="lg"
        isOpen={showModalUpdateInfo}
        onClose={() => {
          setShowModalUpdateInfo(false);
          setIsSubmitting(false);
        }}
        closeOnOverlayClick={false}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Actualizar Informacion</Modal.Header>
          <Modal.Body>
            <CustomDivider text="Informacion de Usuario" />
            <FormControl alignItems="flex-start">
              <FormControl.Label>Estado</FormControl.Label>
              <Switch
                isChecked={formik.values.enabled}
                onToggle={() =>
                  formik.setFieldValue("enabled", !formik.values.enabled)
                }
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Ussername</FormControl.Label>
              <Input
                value={formik.values.username}
                placeholder="Nombre..."
                onChangeText={(username) =>
                  formik.handleChange("username")(username)
                }
              />
              {formik.errors.username && (
                <Text style={{ color: "red" }}>{formik.errors.username}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormControl.Label>Correo</FormControl.Label>
              <Input
                value={formik.values.email}
                placeholder="Correo..."
                onChangeText={(email) => formik.handleChange("email")(email)}
              />
              {formik.errors.email && (
                <Text style={{ color: "red" }}>{formik.errors.email}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormControl.Label>Telefono</FormControl.Label>
              <Input
                value={formik.values.cellPhone}
                placeholder="Telefono..."
                onChangeText={(cellPhone) =>
                  formik.handleChange("cellPhone")(cellPhone)
                }
              />
              {formik.errors.cellPhone && (
                <Text style={{ color: "red" }}>{formik.errors.cellPhone}</Text>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Role</FormControl.Label>
              <Radio.Group
                defaultValue={formik.values.roleId.toString()}
                size="lg"
                name="roleGroup"
                onChange={(value) => {
                  formik.setFieldValue("roleId", value);
                }}
              >
                <Stack direction={{ base: "column", md: "row" }} space={4}>
                  {rolesList.map((role) => (
                    <Radio
                      key={role.id}
                      value={role.id.toString()}
                      icon={
                        <Icon
                          as={
                            <MaterialCommunityIcons name="arrow-right-bold" />
                          }
                        />
                      }
                      my={1}
                    >
                      {role.name}
                    </Radio>
                  ))}
                  {formik.errors.roleId && (
                    <Text style={{ color: "red" }}>{formik.errors.roleId}</Text>
                  )}
                </Stack>
              </Radio.Group>
            </FormControl>
            <CustomDivider text="Actualizar contraseña" />
            <FormControl>
              <FormControl.Label>Nueva Contraseña</FormControl.Label>
              <Input
                value={formik.values.password}
                placeholder="Contraseña:"
                secureTextEntry={true}
                onChangeText={(password) =>
                  formik.handleChange("password")(password)
                }
              />
              {formik.errors.password && (
                <Text style={{ color: "red" }}>{formik.errors.password}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirmacion Contraseña</FormControl.Label>
              <Input
                value={formik.values.passwordConfirm}
                placeholder="Confirmacion Contraseña:"
                secureTextEntry={true}
                onChangeText={(passwordConfirm) =>
                  formik.handleChange("passwordConfirm")(passwordConfirm)
                }
              />
              {formik.errors.passwordConfirm && (
                <Text style={{ color: "red" }}>
                  {formik.errors.passwordConfirm}
                </Text>
              )}
              {passwordMatchError && (
                <Text style={{ color: "red" }}>
                  No coinciden las contraseñas
                </Text>
              )}
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                onPress={() => setShowModalUpdateInfo(false)}
              >
                Cancelar
              </Button>
              <Text></Text>
              <Button
                onPress={() => {
                  formik.handleSubmit();
                }}
                isDisabled={isSubmitting}
              >
                Actualizar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </ScrollView>
  );
}
