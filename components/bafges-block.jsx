'use client'
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export const BadgesBlock = ({ badges, toggle }) => {



  // показываем отмеченные первыми
  const ordered = [...badges].sort((a, b) =>
    a.checked === b.checked ? 0 : a.checked ? -1 : 1
  );



  return (
    <div className="flex gap-3 flex-wrap mt-4 max-h-[90px] overflow-auto">
      {ordered.map((item) => (
        <Badge
          key={item.category}        // на случай, если category нет
          variant={item.checked ? "default" : "outline"}
          onClick={() => toggle(item.category)}
          aria-pressed={!!item.checked}
          className="cursor-pointer"
        >
          {item.name}
        </Badge>
      ))}
    </div>
  );
};
