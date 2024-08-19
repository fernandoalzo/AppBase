import React, { useState } from "react";
import {
  Modal,
  Button,
  FormControl,
  Input,
  ScrollView,
  Text,
  Radio,
  Icon,
  Stack,
} from "native-base";
import { useFormik } from "formik";
import * as Yup from "yup";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { createUserSchema } from "../../schemas/users/CreateUserSchema";

export default function UserAddNewModal({
  showModalAddNew,
  setShowModalAddNew,
  createUser,
  rolesList,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      documentId: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      passwordConfirm: "",
      roleId: "",
    },
    validationSchema: Yup.object(createUserSchema()),
    validateOnChange: false,

    onSubmit: async (formValues, { resetForm }) => {
      setIsSubmitting(true);
      try {
        // check here the password
        if (formValues.password === formValues.passwordConfirm) {
          // extract the passwordConfirm from the object, from this point is unneccesary
          const { passwordConfirm, ...userData } = formValues;
          const rtaCreateUser = await createUser(userData);
          if (rtaCreateUser === 200) {
            setPasswordMatchError(null);
            resetForm();
            setShowModalAddNew(false);
          }
        } else if (formValues.password !== formValues.passwordConfirm) {
          setPasswordMatchError(true);
        } else {
          console.log("Otro error");
        }
      } catch (error) {
        console.error("Error al crear el Usuario", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <ScrollView>
      <Modal
        size="lg"
        isOpen={showModalAddNew}
        onClose={() => {
          setShowModalAddNew(false);
          setIsSubmitting(false);
        }}
        closeOnOverlayClick={false}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Crear nuevo usuario</Modal.Header>
          <Modal.Body>
            <FormControl isRequired>
              <FormControl.Label>Nombre de usuario</FormControl.Label>
              <Input
                value={formik.values.username}
                placeholder="Username:"
                onChangeText={(username) =>
                  formik.handleChange("username")(username)
                }
              />
              {formik.errors.username && (
                <Text style={{ color: "red" }}>{formik.errors.username}</Text>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Documento</FormControl.Label>
              <Input
                value={formik.values.documentId}
                placeholder="Documento:"
                keyboardType="numeric"
                onChangeText={(documentId) =>
                  formik.handleChange("documentId")(documentId)
                }
              />
              {formik.errors.documentId && (
                <Text style={{ color: "red" }}>{formik.errors.documentId}</Text>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Correo</FormControl.Label>
              <Input
                value={formik.values.email}
                placeholder="Correo:"
                autoCapitalize="none"
                onChangeText={(email) => formik.handleChange("email")(email)}
              />
              {formik.errors.email && (
                <Text style={{ color: "red" }}>{formik.errors.email}</Text>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Telefono</FormControl.Label>
              <Input
                value={formik.values.phone}
                placeholder="Telefono:"
                keyboardType="numeric"
                onChangeText={(phone) => formik.handleChange("phone")(phone)}
              />
              {formik.errors.phone && (
                <Text style={{ color: "red" }}>{formik.errors.phone}</Text>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Direccion</FormControl.Label>
              <Input
                value={formik.values.address}
                placeholder="Direccion:"
                keyboardType="numeric"
                onChangeText={(address) =>
                  formik.handleChange("address")(address)
                }
              />
              {formik.errors.address && (
                <Text style={{ color: "red" }}>{formik.errors.address}</Text>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Contraseña</FormControl.Label>
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
            <FormControl isRequired>
              <FormControl.Label>Confirmacion Contraseña</FormControl.Label>
              <Input
                value={formik.values.passwordConfirm}
                placeholder="Confirmacion Contraseña:"
                secureTextEntry={true}
                onChangeText={(passwordConfirm) =>
                  formik.handleChange("passwordConfirm")(passwordConfirm)
                }
              />
              {formik.errors.password && (
                <Text style={{ color: "red" }}>{formik.errors.password}</Text>
              )}
              {passwordMatchError && (
                <Text style={{ color: "red" }}>
                  No coinciden las contraseñas
                </Text>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Role</FormControl.Label>
              <Radio.Group
                defaultValue="2"
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
                      value={role.id}
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
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" onPress={() => setShowModalAddNew(false)}>
                Cancelar
              </Button>
              <Text></Text>
              <Button
                onPress={() => {
                  formik.handleSubmit();
                }}
                isDisabled={isSubmitting}
              >
                Guardar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </ScrollView>
  );
}
