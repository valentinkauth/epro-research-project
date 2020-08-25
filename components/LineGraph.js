import React from "react";
import { LineChart } from "react-native-chart-kit";

// TODO: Based on question type, render specific content and pass question and callback to child component
const LineGraph = (props) => {
  return (
    <LineChart
      data={props.data}
      width={1000} // from react-native
      height={330}
      fromZero={false}
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726",
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 7,
      }}
      verticalLabelRotation={20}
      formatYLabel={(label) => {
        switch (label) {
          case "1":
            return "Ü. nicht";
          case "2":
            return "Wenig";
          case "3":
            return "Mäßig";
          case "4":
            return "Sehr";
        }
      }}
    />
  );
};

export default LineGraph;
