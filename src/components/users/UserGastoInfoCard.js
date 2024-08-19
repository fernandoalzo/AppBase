import {
  Box,
  HStack,
  Avatar,
  VStack,
  Spacer,
  Text,
  Pressable,
  Divider,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

import { formatNumberForOutput } from "./../../utils/utils";

const screenWidth = Dimensions.get("window").width;

export default function UserGastoInfoCard({ gastoInfo }) {
  const userNavigation = useNavigation();

  const goTo = () => {
    // userNavigation.navigate("UserDetails", { id: gastoInfo.id });
    console.log("Pressed th user Credit Card");
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
      width="100%"
      marginBottom={5}
    >
      <Pressable
        onPress={() => {
          goTo();
        }}
      >
        <HStack space={[5, 5]} justifyContent="space-between">
          <Avatar
            size="50px"
            source={require("./../../assets/img/usdRed.png")}
          />
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
              Monto: {formatNumberForOutput(gastoInfo.mount)}
            </Text>
            <Text
              width={screenWidth * 0.75}
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              <Text bold>Comentario:</Text> {gastoInfo.comments}
            </Text>
            <Text
              width={screenWidth * 0.75}
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              <Text bold>Fecha:</Text> {gastoInfo.createdAt}
            </Text>
          </VStack>
        </HStack>
      </Pressable>
    </Box>
  );
}
