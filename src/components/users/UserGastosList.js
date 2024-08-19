import { VStack, HStack, Box, Text, FlatList, Divider } from "native-base";
import UserGastoInfoCard from "./UserGastoInfoCard";

export default function UserCreditsList({ gastosList }) {
  if (!gastosList) {
    gastosList = [];
  }
  return (
    <Box>
      <VStack space={2} divider={<Divider />}>
        <HStack justifyContent="space-between" marginTop={1} h="45">
          <Box flex={1} />
          <Text bold fontSize="xl" color="muted.500">
            Listado de Gastos
          </Text>
          <Box flex={1} />
        </HStack>
      </VStack>
      {gastosList.length > 0 ? (
        <FlatList
          nestedScrollEnabled={true}
          data={gastosList}
          renderItem={({ item }) => <UserGastoInfoCard gastoInfo={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      ) : (
        <Text>No hay gastos</Text>
      )}
    </Box>
  );
}
