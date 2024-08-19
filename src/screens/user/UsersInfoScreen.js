import React, { useState, useEffect, useRef } from "react";
import { ScrollView, View } from "native-base";
import { useFocusEffect } from "@react-navigation/native";

import UsersInfoSection from "../../components/users/UsersInfoSection";
import { getValidateJWT } from "../../api/utils/UtilsAPI";
import { getUsersInfo } from "../../api/users/usersAPI";
// auth
import useAuth from "../../hooks/useAuth";
// import { decodeJWT, validateToken } from "../../utils/utils";
import AuthError from "./../../components/auth/AuthError";

export default function UsersInfoScreen() {
  const fetchedOnMount = useRef(false);
  // auth
  const { auth, logout } = useAuth();
  const [authToken, setAuthToken] = useState(auth.token);
  const [usersInfo, setUsersInfo] = useState(undefined);
  // validate token
  const rtaValidateToken = async () => {
    const validatetoken = await getValidateJWT({ token: authToken });
    if (!validatetoken.responseBody.valid) {
      logout();
    }
  };

  useEffect(() => {
    fetchedOnMount.current = true;
    if (auth && rtaValidateToken()) {
      loadUserInfo();
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (fetchedOnMount.current) {
        console.log("from UsersInfoScreen");
        if (auth && rtaValidateToken()) {
          loadUserInfo();
        }
      }
    }, [])
  );

  const loadUserInfo = async () => {
    // const validatetoken = await getValidateJWT({ token: authToken });
    rtaValidateToken();
    const rtaGetUserById = await getUsersInfo(authToken);
    setUsersInfo(rtaGetUserById.responseBody);
  };

  return (
    <>
      {!auth && rtaValidateToken() ? (
        <AuthError />
      ) : (
        <View bg="white" h="100%">
          {usersInfo && (
            <ScrollView>
              <UsersInfoSection usersInfo={usersInfo} />
            </ScrollView>
          )}
        </View>
      )}
    </>
  );
}
