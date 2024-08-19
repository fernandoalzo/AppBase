import React, { useState, useEffect, useRef } from "react";
import { Box, Container, View, Text } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
// auth
import useAuth from "../../hooks/useAuth";
import { getValidateJWT } from "../../api/utils/UtilsAPI";
import AuthError from "./../../components/auth/AuthError";

export default function HomeScreen() {
  const fetchedOnMount = useRef(false);
  // auth
  const { auth, logout } = useAuth();
  const [authToken, setAuthToken] = useState(auth.token);
  const [userInfo, setUserInfo] = useState(undefined);
  // validate token
  const rtaValidateToken = async () => {
    const validatetoken = await getValidateJWT({ token: authToken });
    setUserInfo(validatetoken.responseBody.tokenDecoded);
    if (!validatetoken.responseBody.valid) {
      logout();
    }
  };

  useEffect(() => {
    fetchedOnMount.current = true;
    if (auth && rtaValidateToken()) {
      console.log("from HomeScreen");
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (fetchedOnMount.current) {
        if (auth && rtaValidateToken()) {
          console.log("from HomeScreen");
        }
      }
    }, [])
  );

  return (
    <>
      {!auth && rtaValidateToken() ? (
        <AuthError />
      ) : (
        <View bg="white">
          <Container width="100%" height="100%" maxWidth="100%" bg="white">
            <Box>
              <Text>Home Screen</Text>
            </Box>
          </Container>
        </View>
      )}
    </>
  );
}
