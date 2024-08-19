import React from "react";
import { Box, Text, Image } from "native-base";

const localImage = require("./../../assets/img/warning.png");

export default function AuthError() {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="white">
      <Box flexDirection="column" justifyContent="center" alignItems="center">
        <Image
          shadow={2}
          source={localImage}
          alt="Alternate Text"
          size="xl"
          top={50}
        />
        <Text
          top={10}
          mb={4}
          fontSize="3xl"
          fontWeight="bold"
          color="red.500"
          textAlign="center"
        >
          Usuario no autenticado
        </Text>{" "}
      </Box>
    </Box>
  );
}
