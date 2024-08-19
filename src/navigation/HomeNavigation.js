import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "./../screens/home/HomeScreen";

const BottomTab = createBottomTabNavigator();

export default function HomeNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Icon name="information-outline" color={color} size={38} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
