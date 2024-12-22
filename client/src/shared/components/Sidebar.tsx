import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FileText, Users, ChevronLeft, ChevronRight, SunMoon, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import useThemeStore from '../../modules/theme/useThemeStore';
import { toast } from 'react-toastify';

const navItems = [
  { path: '/orders', label: 'Заявки', icon: FileText },
  { path: '/managers', label: 'Менеджеры', icon: Users },
  // { path: '/contractors', label: 'Контрагенты', icon: Building2 },
  // { path: '/agents', label: 'Агенты', icon: Briefcase },
  // { path: '/clients', label: 'Клиенты', icon: UserCircle },
  // { path: '/countries', label: 'Страны', icon: Globe2 },
  // { path: '/subagents', label: 'Субагенты', icon: UserCog },
  // { path: '/subagent-payers', label: 'Плательщики Субагентов', icon: CreditCard },
];

interface Props {
  exitApp: (state: boolean) => void
}

export const Sidebar = ({exitApp}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const setTheme = useThemeStore((store) => store.setAltTheme)
  const exit = useNavigate()

  return (
    <div
      className={clsx(
        'h-screen bg-gray-800 text-white left-0 top-0 z-30 transition-all',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex flex-col h-full">
        <div className={clsx(
          'flex items-center p-4 border-b border-gray-700',
          isCollapsed ? 'justify-center' : 'justify-between'
        )}>
          {!isCollapsed && <h1 className="text-xl font-bold">Таблицы</h1>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
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
                      'flex items-center gap-3 p-3 rounded-lg transition-all shadow-sm active:scale-90',
                      isCollapsed ? 'justify-center' : '',
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    )
                  }
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon size={20} />
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            className={clsx(
              'flex items-center gap-3 p-3 rounded-lg transition-all shadow-sm active:scale-90 mb-3 w-full text-gray-300 hover:bg-gray-700',
              isCollapsed ? 'justify-center' : ''
            )}
            onClick={setTheme}
          >
            <SunMoon size={20} />
            {!isCollapsed && <span>Изменить тему</span>}
          </button>
          <button onClick={() => {
            exit("/login")
            exitApp(false)
            localStorage.removeItem("jwt");
            toast.info("Вы вышли из аккаунта")
          }} className='bg-red-600 flex items-center gap-3 p-3 rounded-lg transition-all shadow-sm active:scale-90 w-full hover:bg-red-700'>
            <LogOut size={20}/>
            {!isCollapsed && <span>Выйти</span>}
          </button>
        </div>
      </div>
    </div>
  );
};