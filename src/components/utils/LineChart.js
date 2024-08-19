import React, { useState } from "react";
import { Box, VStack, HStack, Text } from "native-base";
import { VictoryChart, VictoryAxis, VictoryLine } from "victory-native";

export default function LineChart({ data, chartName, yAxis, xAxis }) {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <VStack>
        <HStack justifyContent="space-between" marginTop={5} h="50">
          <Box flex={1} />
          <Text bold fontSize="4xl" color="muted.500">
            {chartName}
          </Text>
          <Box flex={1} />
        </HStack>
      </VStack>
      <Box>
        <VictoryChart>
          <VictoryLine y={yAxis} x={xAxis} data={data} />
          <VictoryAxis
            // label="Fecha"
            style={{
              axisLabel: { padding: 30 },
              tickLabels: { fontSize: 15, padding: 15, angle: 30 },
            }}
          />

          <VictoryAxis
            dependentAxis
            // label="numerode creditos"
            style={{
              axisLabel: { padding: 40 },
              tickLabels: { fontSize: 15, padding: 5 },
            }}
          />
        </VictoryChart>
      </Box>
    </Box>
  );
}
