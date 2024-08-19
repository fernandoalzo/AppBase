import React from "react";
import { Text, Button, Box, FormControl, Stack, Input } from "native-base";
import { useFormik } from "formik";
import * as Yup from "yup";

import { LogInSchema } from "./../../schemas/auth/LogInSchema";

export default function AuthFormLogIn({ LogIn }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object(LogInSchema()),
    validateOnChange: false,
    onSubmit: async (formValues, { resetForm }) => {
      console.log(formValues);
      LogIn(formValues);
    },
  });

  return (
    <Box w="100%" flex={1} justifyContent="center" alignItems="center">
      <Text fontSize={25} color={"coolGray.400"}>
        Inicio de sesion:
      </Text>
      <FormControl isRequired>
        <Stack mx="4">
          <FormControl.Label>Username</FormControl.Label>
          <Input
            _light={{
              bg: "coolGray.100",
              _hover: {
                bg: "coolGray.200",
              },
              _focus: {
                bg: "coolGray.200:alpha.70",
              },
            }}
            shadow={2}
            placeholder="Username..."
            fontSize={15}
            value={formik.values.username}
            onChangeText={(text) => formik.handleChange("username")(text)}
            autoCapitalize="none"
          />
          {Object.keys(formik.errors).length !== 0 ? (
            <Box>
              <Text style={{ color: "red" }}>{formik.errors.username}</Text>
            </Box>
          ) : null}
        </Stack>
      </FormControl>

      <FormControl isRequired>
        <Stack mx="4">
          <FormControl.Label>Password</FormControl.Label>
          <Input
            _light={{
              bg: "coolGray.100",
              _hover: {
                bg: "coolGray.200",
              },
              _focus: {
                bg: "coolGray.200:alpha.70",
              },
            }}
            shadow={2}
            type="password"
            placeholder="Password..."
            fontSize={15}
            value={formik.values.password}
            onChangeText={(text) => formik.handleChange("password")(text)}
            autoCapitalize="none"
          />
          {Object.keys(formik.errors).length !== 0 ? (
            <Box>
              <Text style={{ color: "red" }}>{formik.errors.password}</Text>
            </Box>
          ) : null}
        </Stack>
      </FormControl>
      <Button
        onPress={() => {
          formik.handleSubmit();
        }}
        mt="5"
        colorScheme="cyan"
      >
        Iniciar Sesion
      </Button>
    </Box>
  );
}
