"use client";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

import React from "react";
import { Card } from "./ui/card";

interface Props {
  title: string;
  series: number[];
  labels: string[];
}

function DonutWidget(props: Props) {
  const { title, series, labels } = props;
  const config: ApexOptions = {
    series: series,
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      position: "right",
      offsetY: 0,
      height: 230,
    },
    chart: {
      type: "donut",
      height: 350,
    },
  };
  return (
    <Card className="p-4">
      <p className="text-sm text-gray-700 mb-4">{title}</p>
      <ReactApexChart options={config} series={config.series} type="donut" />
    </Card>
  );
}

export default DonutWidget;
