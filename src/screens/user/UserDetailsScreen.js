import React, { useState, useEffect, useRef } from "react";
import { ScrollView, View } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { getUserById, updateUser } from "./../../api/users/usersAPI";
import { getAllRoles } from "./../../api/roles/rolesAPI";
import UsertInfo from "./../../components/users/UserInfo";
import UserUpdateInfoModal from "./../../components/users/UserUpdateInfoModal";
import { showToastSuccess } from "./../../components/utils/Toasts";
// auth
import useAuth from "../../hooks/useAuth";
import { getValidateJWT } from "../../api/utils/UtilsAPI";
import AuthError from "./../../components/auth/AuthError";

export default function UserDetailsScreen({ navigation, route }) {
  const fetchedOnMount = useRef(false);
  const [userInfoDetails, setUserInfoDetails] = useState({});
  const [showModalUpdateInfo, setShowModalUpdateInfo] = useState(false);
  const [rolesList, setRolesList] = useState([]);
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
    navigation.setOptions({
      headerLeft: () => (
        <Icon name="arrow-left" size={30} onPress={navigation.goBack} />
      ),
      headerRight: () => (
        <Icon
          name="account-edit"
          size={50}
          style={{ marginRight: 15, color: "#279658" }}
          onPress={() => {
            setShowModalUpdateInfo(true);
            loadRoles();
          }}
        />
      ),
    });
    fetchedOnMount.current = true;
    if (auth && rtaValidateToken()) {
      loadUserDetails(route.params.id);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (fetchedOnMount.current) {
        console.log("from UserDetailsScreen");
        if (auth && rtaValidateToken()) {
          loadUserDetails(route.params.id);
        }
      }
    }, [])
  );

  const loadUserDetails = async (userId) => {
    const rtaGetUserById = await getUserById(userId, authToken);
    if (rtaGetUserById.response.status === 200) {
      setUserInfoDetails(rtaGetUserById.responseBody);
    }
  };

  const loadRoles = async () => {
    const rtaGetAllRoles = await getAllRoles(authToken);
    if (rtaGetAllRoles.response.status === 200) {
      setRolesList(rtaGetAllRoles.responseBody);
    }
  };

  const update = async (userId, data) => {
    const rtaUpdateUser = await updateUser(userId, data);
    if (rtaUpdateUser.response.status === 200) {
      // si el usuario que se desactiva es el actual hacer logout
      if (
        userInfo.sub === rtaUpdateUser.responseBody.id &&
        !rtaUpdateUser.responseBody.enabled
      ) {
        logout();
      } else {
        showToastSuccess(
          "Actualizacion",
          "Informacion de Usuario Actualizada!"
        );
      }
    }
    return rtaUpdateUser;
  };

  return (
    <>
      {!auth && rtaValidateToken() ? (
        <AuthError />
      ) : (
        <View bg="white">
          {/* modals section start */}
          <UserUpdateInfoModal
            showModalUpdateInfo={showModalUpdateInfo}
            setShowModalUpdateInfo={setShowModalUpdateInfo}
            userInfo={userInfoDetails}
            rolesList={rolesList}
            update={update}
            loadUserDetails={loadUserDetails}
          />
          {/* modals section ends */}
          <ScrollView>
            {Object.keys(userInfoDetails).keys !== 0 && (
              <UsertInfo userInfo={userInfoDetails} />
            )}
          </ScrollView>
        </View>
      )}
    </>
  );
}
