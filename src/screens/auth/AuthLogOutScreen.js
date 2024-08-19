import React, { useEffect, useRef } from "react";
import { View, Button } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import useAuth from "./../../hooks/useAuth";

export default function AuthLogOutScreen() {
  const fetchedOnMount = useRef(false);
  const { logout } = useAuth();

  useEffect(() => {
    fetchedOnMount.current = true;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (fetchedOnMount.current) {
        console.log("Desde AuthLogOutScreen");
      }
    })
  );
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        onPress={() => {
          logout();
        }}
      >
        Cerrar Sesion
      </Button>
    </View>
  );
}
