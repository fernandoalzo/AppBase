import React from "react";
import { Center, VStack, Input } from "native-base";

export default function SearchBar({ searchQuery, handleSearch }) {
  return (
    <Center bg="white">
      <VStack w="100%" space={5} alignSelf="center" maxW="250px" marginLeft={2}>
        <Input
          placeholder="Buscar..."
          fontSize="15"
          variant="filled"
          width="100%"
          borderRadius="10"
          borderColor="black"
          borderWidth="2"
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
        />
      </VStack>
    </Center>
  );
}
