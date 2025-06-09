import { DataItem } from "@/lib/interfaces";
import { Card, CardContent } from "../../ui/card";

const getStatsByType = (data: DataItem[]) => {
  const stats = data.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return stats;
};

import React from "react";

type Props = {
  data: DataItem[];
};

export const StatCards = ({ data }: Props) => {
  const stats = getStatsByType(data);
  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {Object.entries(stats).map(([type, count]) => (
        <Card
          key={type}
          className="text-center py-1 hover:shadow-md transition-shadow"
        >
          <CardContent className="p-4">
            <div
              className={`text-2xl font-bold ${
                type === "pokemon"
                  ? "text-[#ef5350]"
                  : type === "species"
                  ? "text-[#3761a8]"
                  : type === "type"
                  ? "text-[#feca1b]"
                  : "text-gray-600"
              }`}
            >
              {count}
            </div>
            <div className="text-sm text-gray-600 capitalize">{type}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
