import React from "react";
import { Box, Text, VStack, HStack, Divider } from "native-base";

export default function UserInfoSection({ usersInfo }) {
  return (
    <Box bg="white">
      <VStack space={2} divider={<Divider />}>
        <HStack justifyContent="center" marginTop={5} h="50">
          <Text bold fontSize="xl" color="muted.500">
            Informacion de Usuarios:
          </Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text left={10} bold fontSize="lg">
            numero de usuarios:
          </Text>
          <Text right="60px" fontSize="lg">
            {usersInfo.totalUsers}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}
