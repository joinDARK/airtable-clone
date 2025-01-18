import { NavLink } from "react-router-dom";
import { clsx } from "clsx";

interface NavItem {
  path: string;
  label: string;
  icon: any;
}

interface SidebarNavProps {
  navItems: NavItem[];
  isCollapsed: boolean;
  isAnimating: boolean;
}

export function SidebarNav({
  navItems,
  isCollapsed,
  isAnimating,
}: SidebarNavProps) {
  return (
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
  );
}
