import { FlatList, Text } from "native-base";

import UserInfoCard from "./UserInfoCard";

export default function UsersList({ usersList }) {
  return (
    <FlatList
      data={usersList}
      renderItem={({ item }) => <UserInfoCard userInfo={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}
