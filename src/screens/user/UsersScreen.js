import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Fab, Icon, View } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import UsersList from "./../../components/users/UsersList";
import { getAllUsers, createNewUser } from "./../../api/users/usersAPI";
import UserAddNewModal from "./../../components/users/UserAddNewModal";
import { getAllRoles } from "./../../api/roles/rolesAPI";
import { showToastSuccess } from "./../../components/utils/Toasts";
// auth
import useAuth from "../../hooks/useAuth";
import { getValidateJWT } from "../../api/utils/UtilsAPI";
import AuthError from "./../../components/auth/AuthError";

export default function CreditsScreen() {
  const fetchedOnMount = useRef(false);
  const [usersList, setUsersList] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [showModalAddNew, setShowModalAddNew] = useState(false);
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
      loadUsers();
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (fetchedOnMount.current) {
        console.log("from UsersScreen");
        if (auth && rtaValidateToken()) {
          loadUsers();
        }
      }
    }, [])
  );

  const loadUsers = async () => {
    const rtaGetAllUsers = await getAllUsers(authToken);
    if (rtaGetAllUsers.response.status === 200) {
      setUsersList(rtaGetAllUsers.responseBody);
    }
  };

  const loadRoles = async () => {
    const rtaGetAllRoles = await getAllRoles(authToken);
    if (rtaGetAllRoles.response.status === 200) {
      setRolesList(rtaGetAllRoles.responseBody);
    }
  };

  const createUser = async (data) => {
    const userData = {
      ...data,
      enabled: true,
      reputation: 0,
      verified: false,
    };
    const rtaCreateNewUser = await createNewUser(userData, authToken);
    if (rtaCreateNewUser.response.status === 200) {
      showToastSuccess(
        "Creacion Usuario",
        "Se creo el usuario de forma Exitosa"
      );
      loadUsers();

      return rtaCreateNewUser.response.status;
    }
  };

  return (
    <>
      {!auth && rtaValidateToken() ? (
        <AuthError />
      ) : (
        <View bg="white">
          {/* modal section start */}
          <UserAddNewModal
            showModalAddNew={showModalAddNew}
            setShowModalAddNew={setShowModalAddNew}
            createUser={createUser}
            rolesList={rolesList}
          />
          {/* modal section start */}
          <Container width="100%" height="100%" maxWidth="100%" bg="white">
            <Box flex={1} width="200%">
              <UsersList usersList={usersList} />
            </Box>
          </Container>
          <Container>
            <Fab
              renderInPortal={false}
              shadow={2}
              placement="bottom-right"
              style={{ right: -70, bottom: 90 }}
              size="md"
              bg="green.500"
              icon={
                <Icon
                  color="white"
                  as={MaterialCommunityIcons}
                  name="account-plus"
                  size="8"
                />
              }
              onPress={() => {
                loadRoles();
                setShowModalAddNew(true);
              }}
            />
          </Container>
        </View>
      )}
    </>
  );
}
