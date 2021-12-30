import React from "react";
import { Chart } from "react-google-charts";

// export const data = [
//   ["Candidate", "Vote"],
//   ["2014", 1000],
//   ["2015", 1170],
//   ["2016", 660],
//   ["2017", 1030],
// ];

export const options = (title, subTitle) => {
    return {
        chart: {
          title: title,
          subtitle: subTitle,
        }

    }
};

export function BarChart({data, title = "", subTitle = ""}) {
    console.log(data)
  return (
      data &&
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options(title, subTitle)}
    />
  );
}
