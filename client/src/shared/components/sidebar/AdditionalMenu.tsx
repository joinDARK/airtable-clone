import React from "react";
import { NavLink } from "react-router-dom";
import { clsx } from "clsx";
import { History, SunMoon, MoreVertical } from "lucide-react";

interface AdditionalMenuProps {
  dropdownRef: React.RefObject<HTMLDivElement>;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (val: boolean) => void;
  isCollapsed: boolean;
  isAnimating: boolean;
  onHistoryClick: () => void;
  onThemeToggle: () => void;
}

export function AdditionalMenu({
  dropdownRef,
  isDropdownOpen,
  setIsDropdownOpen,
  isCollapsed,
  isAnimating,
  onHistoryClick,
  onThemeToggle,
}: AdditionalMenuProps) {
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={clsx("relative mb-3", isCollapsed && "flex justify-center")}
      ref={dropdownRef}
    >
      <button
        title="Дополнительно"
        onClick={toggleDropdown}
        className={clsx(
          "flex items-center gap-3 p-3 rounded-lg shadow-sm w-full",
          "text-gray-300 hover:bg-gray-700 transition-colors",
          isCollapsed ? "justify-center" : ""
        )}
      >
        <MoreVertical size={20} />
        {!isCollapsed && !isAnimating && <span>Дополнительно</span>}
      </button>

      {isDropdownOpen && (
        <div
          className={clsx(
            "absolute bottom-full right-0 mt-2 bg-gray-300 text-gray-900",
            "rounded shadow-lg p-2 z-40 w-full"
          )}
          style={{ animation: "fadeIn 0.2s" }}
        >
          <NavLink
            to={"history"}
            className="flex items-center gap-2 px-3 py-2 w-full rounded hover:bg-gray-100"
            title={isCollapsed ? "История изменений" : undefined}
            onClick={() => {
              onHistoryClick();
              closeDropdown();
            }}
          >
            <History size={20} />
            {!isCollapsed && !isAnimating && <span>История изменений</span>}
          </NavLink>

          <button
            className="flex items-center gap-2 px-3 py-2 w-full rounded hover:bg-gray-100"
            onClick={() => {
              onThemeToggle();
              closeDropdown();
            }}
          >
            <SunMoon size={20} />
            {!isCollapsed && !isAnimating && <span>Изменить тему</span>}
          </button>
        </div>
      )}
    </div>
  );
}
