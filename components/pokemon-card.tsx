import { getTypeColor } from "@/lib/utils";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./ui/card";
import { DataItem } from "@/lib/interfaces";
import { Badge } from "./ui/badge";

type Props = {
  item: DataItem;
  index: number;
};

export const PokemonCard = ({ item, index }: Props) => {
  return (
    <Card className="mb-4 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] gap-1">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge className={getTypeColor(item.type)}>
            {item.type.toUpperCase()}
          </Badge>
          <span className="text-sm text-muted-foreground">#{index + 1}</span>
        </div>
        <CardTitle className="text-lg capitalize text-[#3761a8]">
          {item.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-2">{item.description}</CardDescription>
        <p className="text-sm text-muted-foreground truncate">
          URL: {item.url}
        </p>
      </CardContent>
    </Card>
  );
};
