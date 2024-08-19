import React, { useState } from "react";
import { Box, VStack, HStack, Text } from "native-base";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";

export default function BarChart({ data, chartName, yAxis, xAxis }) {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <VStack>
        <HStack justifyContent="space-between" marginTop={5} h="50">
          <Box flex={1} />
          <Text bold fontSize="3xl" color="muted.500">
            {chartName}
          </Text>
          <Box flex={1} />
        </HStack>
      </VStack>
      <Box>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryAxis
            style={{
              tickLabels: {
                angle: 30,
                textAnchor: "start",
                padding: 1,
              },
            }}
          />
          <VictoryBar
            data={data}
            y={yAxis}
            x={xAxis}
            style={{
              data: {
                fill: ({ index }) => (index === 0 ? "#c01032" : "#1d7839"),
                width: 32,
                stroke: "#000",
                strokeWidth: 3,
              },
              labels: {
                fill: "#000",
              },
            }}
            labelComponent={<VictoryLabel dy={-10} style={{ fontSize: 12 }} />}
            labels={({ datum }) => datum.payment_count.toString()}
          />
        </VictoryChart>
      </Box>
    </Box>
  );
}
