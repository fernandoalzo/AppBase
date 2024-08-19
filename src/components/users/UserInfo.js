import React, { useState, useEffect } from "react";
import { Text, Box, HStack, VStack, Divider, Button } from "native-base";

export default function UsertInfo({ userInfo }) {
  return (
    <Box>
      <VStack space={2} divider={<Divider />}>
        <HStack justifyContent="space-between" marginTop={5} h="50">
          <Box flex={1} />
          <Text bold fontSize="xl" color="muted.500">
            Informacion del Usuario
          </Text>
          <Box flex={1} />
        </HStack>
        <HStack justifyContent="space-between">
          <Text left={10} bold fontSize="lg">
            id:
          </Text>
          <Text right={10}>{userInfo.id}</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text left={10} bold fontSize="lg">
            Usuario:
          </Text>
          <Text right={10}>{userInfo.username}</Text>
        </HStack>
        {userInfo.role && (
          <HStack justifyContent="space-between">
            <Text left={10} bold fontSize="lg">
              Perfil:
            </Text>
            <Text right={10}>{userInfo.role.name}</Text>
          </HStack>
        )}
        <HStack justifyContent="space-between">
          <Text left={10} bold fontSize="lg">
            Status:
          </Text>
          {userInfo.enabled ? (
            <Text right={10}>Activo</Text>
          ) : (
            <Text right={10}>Desactivado</Text>
          )}
        </HStack>
        <HStack justifyContent="space-between">
          <Text left={10} bold fontSize="lg">
            Cuenta Verificada:
          </Text>
          {userInfo.verified ? (
            <Text right={10}>Si</Text>
          ) : (
            <Text right={10}>No</Text>
          )}
        </HStack>
        <HStack justifyContent="space-between">
          <Text left={10} bold fontSize="lg">
            Email:
          </Text>
          <Text right={10}>{userInfo.email}</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text left={10} bold fontSize="lg">
            Telefono:
          </Text>
          <Text right={10}>{userInfo.phone}</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text left={10} bold fontSize="lg">
            Direccion:
          </Text>
          <Text right={10}>{userInfo.address}</Text>
        </HStack>
      </VStack>
    </Box>
  );
}
