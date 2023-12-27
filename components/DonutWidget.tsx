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
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: '100%',
          },
          legend: {
            show: true
          },
        },
      },
    ],
    legend: {
      position: "right",
      offsetY: 0,
    },
    noData: {
      text: "No data",
    },
  };
  return (
    <Card className="p-4">
      <p className="text-sm text-gray-700 mb-4">{title}</p>
      <ReactApexChart options={config} series={config.series} type="donut"  />
    </Card>
  );
}

export default DonutWidget;
