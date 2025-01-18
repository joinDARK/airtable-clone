import React from "react";
import { clsx } from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  isAnimating: boolean;
  onCollapse: () => void;
}

export function SidebarHeader({
  isCollapsed,
  isAnimating,
  onCollapse,
}: SidebarHeaderProps) {
  return (
    <div
      className={clsx(
        "flex items-center p-4 border-b border-gray-700",
        isCollapsed ? "justify-center" : "justify-between"
      )}
    >
      {!isCollapsed && !isAnimating && (
        <h1 className="text-xl font-bold">Таблицы</h1>
      )}

      <button
        onClick={onCollapse}
        className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        title={isCollapsed ? "Развернуть" : "Свернуть"}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </div>
  );
}
