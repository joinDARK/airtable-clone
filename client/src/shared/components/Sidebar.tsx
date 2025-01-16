import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FileText,
  History,
  Users,
  ChevronLeft,
  ChevronRight,
  SunMoon,
  LogOut,
  Building2,
  Briefcase,
  UserCircle,
  Globe2,
  UserCog,
  CreditCard,
  MoreVertical,
} from "lucide-react";
import { clsx } from "clsx";
import useThemeStore from "@services/theme/useThemeStore";
import { toast } from "react-toastify";
import { decodeToken } from "@services/jwt";
import historyApi from "@services/api/history";

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

export const Sidebar = ({ exitApp }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Состояние для hover на кнопке "Выйти"
  const [isHovered, setIsHovered] = useState(false);

  // Состояние для выпадающего меню "Дополнительно"
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const setTheme = useThemeStore((store) => store.setAltTheme);
  const navigate = useNavigate();

  const jwt = localStorage.getItem("jwt");
  const decode = decodeToken(jwt);
  const login = decode.login ?? "Skipped";

  const animationDuration = 80;

  // Реф, чтобы отлавливать клики вне дропдауна
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCollapse = () => {
    setIsAnimating(true);
    setIsCollapsed((prev) => !prev);
    setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  };

  const handleLogout = () => {
    navigate("/login");
    exitApp(false);
    localStorage.removeItem("jwt");
    toast.info("Вы вышли из аккаунта");
  };

  // Открытие/закрытие дропдауна
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // При клике вне меню — закрываем его
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
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

  const handleHistoryClick = async () => {
    // todo
    try {
      const history = await historyApi.getAll();
      const data = history.data;
      const allHistory = JSON.stringify(data, null, 2);
      console.info(allHistory);
    } catch (error) {
      toast.error("Ошибка при получении истории изменений");
      console.error(error);
    }
  };
  

  return (
    <div
      className={clsx(
        "h-screen bg-gray-800 text-white left-0 top-0 z-30",
        "transition-[width] duration-200 ease-in-out",
        "overflow-x-hidden",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
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
            onClick={handleCollapse}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            title={isCollapsed ? "Развернуть" : "Свернуть"}
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-2 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center gap-3 p-3 rounded-lg shadow-sm active:scale-90 transition-colors",
                      isCollapsed ? "justify-center" : "",
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-700"
                    )
                  }
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon size={20} />
                  {!isCollapsed && !isAnimating && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div
            className={clsx(
              "relative mb-3",
              isCollapsed && "flex justify-center"
            )}
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
                  "absolute bottom-full right-0 mt-2 bg-gray-300 text-gray-900 rounded shadow-lg p-2 z-40 w-full",
                  "animate-fadeIn"
                )}
              >
                <NavLink
                  key={"history"}
                  to={"history"}
                  className="flex items-center gap-2 px-3 py-2 w-full rounded hover:bg-gray-100"
                  title={isCollapsed ? "История изменений" : undefined}
                  onClick={() => closeDropdown()}
                >
                  <History size={20} />
                  {!isCollapsed && !isAnimating && <span>История изменений</span>}
                </NavLink>

                <button
                  className="flex items-center gap-2 px-3 py-2 w-full rounded hover:bg-gray-100"
                  onClick={() => {
                    setTheme();
                    closeDropdown();
                  }}
                >
                  <SunMoon size={20} />
                  {!isCollapsed && !isAnimating && <span>Изменить тему</span>}
                </button>
              </div>
            )}
          </div>

          <button
            title="Выйти"
            onClick={handleLogout}
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
        </div>
      </div>
    </div>
  );
};
