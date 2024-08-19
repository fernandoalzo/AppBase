import { VStack, HStack, Box, Text, FlatList, Divider } from "native-base";
import UserCreditInfoCard from "./UserCreditInfoCard";

export default function UserCreditsList({ creditList }) {
  // creditList always be a list,
  if (!creditList) {
    creditList = [];
  }
  return (
    <Box>
      <VStack space={2} divider={<Divider />}>
        <HStack justifyContent="space-between" marginTop={1} h="45">
          <Box flex={1} />
          <Text bold fontSize="xl" color="muted.500">
            Listado de Creditos Abiertos
          </Text>
          <Box flex={1} />
        </HStack>
      </VStack>
      {creditList.length > 0 ? (
        <FlatList
          nestedScrollEnabled={true}
          data={creditList}
          renderItem={({ item }) => <UserCreditInfoCard creditInfo={item} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>No hay creditos</Text>
      )}
    </Box>
  );
}
