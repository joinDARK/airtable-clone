import React from "react";
import { clsx } from "clsx";
import { LogOut } from "lucide-react";

interface SidebarFooterProps {
  login: string;
  onLogout: () => void;
  isCollapsed: boolean;
  isAnimating: boolean;
  isHovered: boolean;
  setIsHovered: (val: boolean) => void;
}

export function SidebarFooter({
  login,
  onLogout,
  isCollapsed,
  isAnimating,
  isHovered,
  setIsHovered,
}: SidebarFooterProps) {
  return (
    <button
      title="Выйти"
      onClick={onLogout}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={clsx(
        "bg-red-600 flex items-center gap-3 p-3 rounded-lg shadow-sm active:scale-90 w-full",
        "transition-colors hover:bg-red-700",
        isCollapsed ? "justify-center" : ""
      )}
    >
      <LogOut size={20} />
      {!isCollapsed && !isAnimating && (
        <span>{isHovered ? "Выйти" : login}</span>
      )}
    </button>
  );
}
