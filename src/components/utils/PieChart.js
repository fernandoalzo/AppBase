import React, { useState } from "react";
import { Box, VStack, HStack, Text } from "native-base";
import { VictoryPie, VictoryTheme, VictoryLabel } from "victory-native";

export default function PieChart({ data, chartName, loadPaymentsByStatus }) {
  const [clicked, setClicked] = useState(false);
  const [clickedData, setClickedData] = useState(null);

  const handlePieClick = async (evt, clickedSlice) => {
    setClicked(!clicked);
    setClickedData(clickedSlice);
    // const clickedSliceString = clickedSlice.x;
    const clickedSliceAsObject = {
      [clickedSlice.x.split(":")[0].trim()]: parseInt(
        clickedSlice.x.split(":")[1].trim()
      ),
    };
    if (loadPaymentsByStatus) {
      await loadPaymentsByStatus(Object.keys(clickedSliceAsObject)[0]);
    }
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <VStack>
        <HStack justifyContent="space-between" marginTop={5} h="50">
          {chartName && (
            <>
              <Box flex={1} />
              <Text bold fontSize="4xl" color="muted.500">
                {chartName}
              </Text>
              <Box flex={1} />
            </>
          )}
        </HStack>
      </VStack>
      <Box width={350} height={350}>
        <VictoryPie
          theme={VictoryTheme.material}
          width={350}
          height={350}
          innerRadius={50}
          labelRadius={40}
          labelComponent={
            <VictoryLabel
              angle={0}
              style={{
                fill: "black",
                fontSize: 15,
                fontFamily: "Arial",
                fontWeight: "bold",
              }}
            />
          }
          colorScale={["#1d7839", "#c01032", "#6f6b6c"]}
          data={data}
          style={{
            data: {
              stroke: "#000",
              strokeWidth: 2,
            },
          }}
          events={[
            {
              target: "data",
              eventHandlers: {
                onPress: (evt, props) => {
                  handlePieClick(evt, props.datum);
                },
              },
            },
          ]}
        />
      </Box>
    </Box>
  );
}
