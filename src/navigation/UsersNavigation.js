import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import UsersInfoScreen from "../screens/user/UsersInfoScreen";
import CreditsScreen from "./../screens/user/UsersScreen";
import UserDetailsScreen from "./../screens/user/UserDetailsScreen";

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const UsersStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UsersList"
        component={CreditsScreen}
        options={{ headerShown: false, tabBarLabel: "" }}
      />
      <Stack.Screen
        name="UserDetails"
        component={UserDetailsScreen}
        options={{ headerTitle: "" }}
      />
    </Stack.Navigator>
  );
};

export default function UsersNavigation() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="UsersInfoScreen"
        component={UsersInfoScreen}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Icon name="information-outline" color={color} size={38} />
          ),
        }}
      />
      <BottomTab.Screen
        name="CreditsScreen"
        component={UsersStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Icon name="format-list-bulleted-square" color={color} size={38} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
