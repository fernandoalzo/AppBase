import {
  Box,
  HStack,
  Avatar,
  VStack,
  Text,
  Pressable,
  Progress,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

import { formatNumberForOutput } from "./../../utils/utils";

const screenWidth = Dimensions.get("window").width;

export default function UserCreditInfoCard({ creditInfo }) {
  const userNavigation = useNavigation();

  const goTo = () => {
    userNavigation.navigate("UserCreditDetails", { id: creditInfo.id });
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
      marginBottom={1}
    >
      <Pressable
        onPress={() => {
          goTo();
        }}
      >
        <HStack space={[5, 5]} justifyContent="space-between">
          <Avatar size="50px" source={require("./../../assets/img/usd.png")} />
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
              Monto: {formatNumberForOutput(creditInfo.creditMount)}
            </Text>
            <Text
              width={screenWidth * 0.75}
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              <Text bold>Estado:</Text> {creditInfo.status}
            </Text>
            <Text
              width={screenWidth * 0.75}
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              <Text bold>Inicio Credito:</Text> {creditInfo.startCredit}
            </Text>
            <Text
              width={screenWidth * 0.75}
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              <Text bold>Fin Credito:</Text> {creditInfo.endCredit}
            </Text>
            <Text
              width={screenWidth * 0.75}
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              <Text bold>Ultima Actualizacion:</Text> {creditInfo.updatedAt}
            </Text>

            <HStack justifyContent="space-between">
              <Progress
                top={2}
                right={20}
                w={screenWidth * 0.95}
                shadow={3}
                value={creditInfo.contractPercent}
                mx="4"
                size="sm"
              />
            </HStack>
          </VStack>
        </HStack>
      </Pressable>
    </Box>
  );
}
