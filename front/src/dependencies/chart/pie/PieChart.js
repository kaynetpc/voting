import React from "react";
import { Chart } from "react-google-charts";

// export const data = [
//   ["Task", "Hours per Day"],
//   ["Work", 11],
//   ["Eat", 2],
//   ["Commute", 2],
//   ["Watch TV", 2],
//   ["Sleep", 7],
// ];

export const options = (title) => {
    return {
        title: title,
        is3D: true
    }
};

export function PieChart({data, title}) {
  return (
      data &&
    <Chart
      chartType="PieChart"
      data={data}
      options={options(title)}
      width={"100%"}
      height={"400px"}
    />
  );
}