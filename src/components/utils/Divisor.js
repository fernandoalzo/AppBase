import React from "react";
import { Box, Text } from "native-base";

const CustomDivider = ({ text }) => {
  return (
    <Box flexDirection="row" alignItems="center" my={3}>
      <Box flex={1} height={0.5} bg="gray.500" />
      <Text mx={1} fontSize="md" fontWeight="bold" color="gray.500">
        {text}
      </Text>
      <Box flex={1} height={0.5} bg="gray.500" />
    </Box>
  );
};
export default CustomDivider;
