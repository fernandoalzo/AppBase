import React from "react";
import { View, Image, StyleSheet, Button } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import UsersNavigation from "./UsersNavigation";
import AuthNavigation from "./AuthNavigation";

// auth
import useAuth from "../hooks/useAuth";
import AuthLogOutScreen from "./../screens/auth/AuthLogOutScreen";

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  drawerItemStyle: {
    borderBottomWidth: 3,
    borderBottomColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  headerContainer: {
    padding: 20,

    alignItems: "center",
    backgroundColor: "white",
  },
  headerImage: {
    width: 150,
    height: 150,
  },
});

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.headerContainer}>
        <Image
          source={require("./../assets/img/logo.png")} // URL de tu imagen
          style={styles.headerImage}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function Navigation() {
  const { auth } = useAuth(9);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {!auth ? (
        <Drawer.Screen
          name="Login"
          component={AuthNavigation}
          options={{
            tabBarLabel: "",
            drawerIcon: ({ color, size }) => (
              <Icon name="login" color={color} size={size} />
            ),
            drawerItemStyle: styles.drawerItemStyle,
          }}
        />
      ) : (
        <>
          <Drawer.Screen
            name="Usuarios"
            component={UsersNavigation}
            options={{
              tabBarLabel: "",
              drawerIcon: ({ color, size }) => (
                <Icon name="account-cog" color={color} size={size} />
              ),
              drawerItemStyle: styles.drawerItemStyle,
            }}
          />
          <Drawer.Screen
            name="logout"
            component={AuthLogOutScreen}
            options={{
              tabBarLabel: "",
              drawerIcon: ({ color, size }) => (
                <Icon name="logout" color={color} size={size} />
              ),
              drawerItemStyle: styles.drawerItemStyle,
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}
