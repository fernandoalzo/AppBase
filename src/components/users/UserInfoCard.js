import { Box, HStack, Avatar, VStack, Spacer, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, TouchableOpacity } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function UserInfoCard({ userInfo }) {
  const userNavigation = useNavigation();

  const goTo = () => {
    userNavigation.navigate("UserDetails", { id: userInfo.id });
  };

  return (
    <Box
      borderBottomWidth="5"
      _dark={{
        borderColor: "muted.50",
      }}
      borderColor="muted.800"
      px="1"
      py="5"
      width="50%"
    >
      <TouchableOpacity
        onPress={() => {
          goTo();
        }}
      >
        <HStack space={[5, 5]} justifyContent="space-between">
          <Avatar size="50px" source={require("./../../assets/img/user.png")} />
          <VStack>
            <Text
              width={screenWidth * 0.75}
              fontSize="xl"
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              bold
            >
              Usuario: {userInfo.username}
            </Text>
            {userInfo.role.name && (
              <Text
                width={screenWidth * 0.75}
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                <Text bold>Role:</Text> {userInfo.role.name}
              </Text>
            )}

            {userInfo.enabled ? (
              <Text
                width={screenWidth * 0.75}
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                <Text bold>Status:</Text> Activo
              </Text>
            ) : (
              <Text
                width={screenWidth * 0.75}
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                <Text bold>Status:</Text> Desactivado
              </Text>
            )}

            <Text
              width={screenWidth * 0.75}
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              <Text bold>Email:</Text> {userInfo.email}
            </Text>
            <Text
              width={screenWidth * 0.75}
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              <Text bold>Telefono:</Text> {userInfo.phone}
            </Text>
          </VStack>
          <Spacer />
          <Text
            fontSize="xs"
            _dark={{
              color: "warmGray.50",
            }}
            color="coolGray.800"
            alignSelf="flex-start"
          >
            {userInfo.id}
          </Text>
        </HStack>
      </TouchableOpacity>
    </Box>
  );
}
