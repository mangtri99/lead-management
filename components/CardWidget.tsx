"use client";
import React from "react";
import { Card } from "./ui/card";

interface Props {
  title: string;
  value: string;
  description?: string;
}

function CardWidget(props: Props) {
  const { title, value, description } = props;
  return (
    <Card className="px-4 py-5">
      <div className="flex flex-col justify-center">
        <p className="text-sm text-gray-700">{title}</p>
        <p className="text-2xl font-bold mb-4 mt-2">{value}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </Card>
  );
}

export default CardWidget;
