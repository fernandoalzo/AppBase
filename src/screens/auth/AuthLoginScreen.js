import React, { useEffect, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "native-base";

import useAuth from "./../../hooks/useAuth";
import { getLogin } from "./../../api/auth/AuthAPI";
import AuthFormLogIn from "./../../components/auth/AuthFormLogIn";
import {
  showToastFail,
  showToastSuccess,
} from "./../../components/utils/Toasts";

export default function AuthLoginScreen() {
  const fetchedOnMount = useRef(false);
  const { login } = useAuth();

  useEffect(() => {
    fetchedOnMount.current = true;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (fetchedOnMount.current) {
        console.log("Desde AuthLoginScreen");
      }
    })
  );

  const LogIn = async (loginData) => {
    const rtaGetLogin = await getLogin(loginData);
    switch (rtaGetLogin.response.status) {
      case 200:
        login(rtaGetLogin.responseBody);
        showToastSuccess("Autenticacion", "Autenticacion exitosa");
        break;
      case 404:
        showToastFail("Autenticacion.", "Usuario no existe!");
        break;
      case 401:
        showToastFail(
          "Error de Autenticacion.",
          rtaGetLogin.responseBody.message
        );
        break;
      default:
        console.log(rtaGetLogin.response.status);

        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} bg="white">
      <AuthFormLogIn LogIn={LogIn} />
    </ScrollView>
  );
}
