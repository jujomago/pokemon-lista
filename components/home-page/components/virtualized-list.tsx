"use client";

import { VirtualizedListProps } from "@/lib/interfaces";
import type React from "react";

import { useState, useRef } from "react";

export function VirtualizedList<T>({
  items,
  renderItem,
  itemHeight,
  containerHeight,
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calcular qué elementos mostrar basado en el scroll
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div className="border rounded-lg bg-[#ffd341] shadow-sm">
      <div
        ref={containerRef}
        className="overflow-auto"
        style={{ height: containerHeight }}
        onScroll={handleScroll}
      >
        <div style={{ height: totalHeight, position: "relative" }}>
          <div
            style={{
              transform: `translateY(${offsetY}px)`,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            {visibleItems.map((item, index) => (
              <div
                key={startIndex + index}
                style={{ height: itemHeight }}
                className="px-4 py-2"
              >
                {renderItem(item, startIndex + index)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Información de scroll */}
      <div className="px-4 py-2 border-t border-pokemon-blue/20 text-sm text-[#3761a8]">
        Mostrando elementos {startIndex + 1} -{" "}
        {Math.min(endIndex, items.length)} de {items.length.toLocaleString()}
      </div>
    </div>
  );
}
