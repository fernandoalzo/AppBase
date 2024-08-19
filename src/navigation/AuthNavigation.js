import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthLoginScreen from "../screens/auth/AuthLoginScreen";

const Stack = createStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={AuthLoginScreen}
        options={{ headerShown: false, tabBarLabel: "" }}
      />
    </Stack.Navigator>
  );
}
