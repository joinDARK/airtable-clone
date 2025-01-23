import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { clsx } from "clsx";
import { toast } from "react-toastify";
import { decodeToken } from "@services/jwt";
import useThemeStore from "@services/theme/useThemeStore";
import historyApi from "@services/api/history";

import { SidebarHeader } from "./SidebarHeader";
import { SidebarNav } from "./SidebarNav";
import { AdditionalMenu } from "./AdditionalMenu";
import { SidebarFooter } from "./SidebarFooter";

import {
  FileText,
  Users,
  Building2,
  Briefcase,
  UserCircle,
  Globe2,
  UserCog,
  CreditCard,
} from "lucide-react";

// Константа с пунктами основного меню
const navItems = [
  { path: "/orders", label: "Заявки", icon: FileText },
  { path: "/managers", label: "Менеджеры", icon: Users },
  { path: "/contagents", label: "Контрагенты", icon: Building2 },
  { path: "/agents", label: "Агенты", icon: Briefcase },
  { path: "/clients", label: "Клиенты", icon: UserCircle },
  { path: "/countries", label: "Страны", icon: Globe2 },
  { path: "/subagents", label: "Субагенты", icon: UserCog },
  {
    path: "/subagent-payers",
    label: "Плательщики Субагентов",
    icon: CreditCard,
  },
];

interface Props {
  exitApp: (state: boolean) => void;
}

export function Sidebar({ exitApp }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const setTheme = useThemeStore((store) => store.setAltTheme);
  const navigate = useNavigate();

  const jwt = localStorage.getItem("jwt");
  const decode = decodeToken(jwt);
  const login = decode?.login ?? "Skipped";

  const animationDuration = 80;

  // Свернуть/развернуть меню
  const handleCollapse = () => {
    setIsAnimating(true);
    setIsCollapsed((prev) => !prev);
    setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  };

  // Выход из аккаунта
  const handleLogout = () => {
    navigate("/login");
    exitApp(false);
    localStorage.removeItem("jwt");
    toast.info("Вы вышли из аккаунта");
  };

  // Клик вне дропдауна => закрываем
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Получить и вывести историю изменений
  const handleHistoryClick = async () => {
    try {
      const history = await historyApi.getAll();
      console.info("История изменений:", JSON.stringify(history.data, null, 2));
    } catch (error) {
      toast.error("Ошибка при получении истории изменений");
      console.error(error);
    }
  };

  // Рендер
  return (
    <div
      className={clsx(
        "h-screen bg-gray-800 text-white left-0 top-0 z-30",
        "transition-[width] duration-200 ease-in-out overflow-x-hidden",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <SidebarHeader
          isCollapsed={isCollapsed}
          isAnimating={isAnimating}
          onCollapse={handleCollapse}
        />

        <SidebarNav
          navItems={navItems}
          isCollapsed={isCollapsed}
          isAnimating={isAnimating}
        />

        <div className="p-4 border-t border-gray-700">
          <AdditionalMenu
            dropdownRef={dropdownRef}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            isCollapsed={isCollapsed}
            isAnimating={isAnimating}
            onHistoryClick={handleHistoryClick}
            onThemeToggle={setTheme}
          />

          <SidebarFooter
            login={login}
            onLogout={handleLogout}
            isCollapsed={isCollapsed}
            isAnimating={isAnimating}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
          />
        </div>
      </div>
    </div>
  );
}
