import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Boxes, 
  BarChart2, 
  Settings, 
  Bell, 
  Menu, 
  X, 
  LogOut, 
  User, 
  ChevronDown,
  Factory,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import LanguageSelector from '../components/LanguageSelector';
import { useTranslation } from 'react-i18next';

const DashboardLayout: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { mode, setMode, isDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const navigationItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: t('nav.dashboard') },
    { path: '/work-orders', icon: <ClipboardList size={20} />, label: t('nav.workOrders') },
    { path: '/inventory', icon: <Boxes size={20} />, label: t('nav.inventory') },
    { path: '/analytics', icon: <BarChart2 size={20} />, label: t('nav.analytics') },
    { path: '/settings', icon: <Settings size={20} />, label: t('nav.settings') },
  ];

  const mockNotifications = [
    { id: 1, title: 'Low inventory alert', message: 'Aluminum sheets running low', time: '5 min ago', read: false },
    { id: 2, title: 'Maintenance reminder', message: 'Schedule maintenance for Machine B12', time: '2 hours ago', read: false },
    { id: 3, title: 'Work order completed', message: 'Order #5821 has been fulfilled', time: 'Yesterday', read: true },
  ];

  const toggleTheme = () => {
    setMode(isDark ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 z-30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center">
              <button 
                className="lg:hidden mr-2 text-gray-600"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="flex items-center">
                <Factory className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">{t('app.name')}</span>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <LanguageSelector />
              
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-1 rounded-md hover:bg-gray-100 text-gray-600"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button 
                  className="p-1 rounded-md hover:bg-gray-100 text-gray-600 focus:outline-none"
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setUserMenuOpen(false);
                  }}
                >
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {mockNotifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                        >
                          <div className="flex justify-between">
                            <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                            <p className="text-xs text-gray-500">{notification.time}</p>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100 text-center">
                      <button className="text-sm text-indigo-600 font-medium">View all notifications</button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="relative">
                <button 
                  className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen);
                    setNotificationsOpen(false);
                  }}
                >
                  <img 
                    src={user?.avatar || "https://i.pravatar.cc/150?img=11"} 
                    alt="User avatar" 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="ml-2 hidden md:block text-sm font-medium">{user?.name || 'User'}</span>
                  <ChevronDown size={16} className="ml-1 hidden md:block" />
                </button>

                {/* User Menu Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => navigate('/profile')}
                    >
                      <User size={16} className="mr-2" />
                      Profile
                    </button>
                    <button 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => navigate('/settings')}
                    >
                      <Settings size={16} className="mr-2" />
                      Settings
                    </button>
                    <button 
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                      onClick={logout}
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={`bg-indigo-800 text-white w-64 fixed inset-y-0 left-0 z-20 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static lg:inset-0`}
        >
          <div className="h-16 flex items-center justify-center lg:justify-start px-4 lg:px-6 border-b border-indigo-700">
            <Factory className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-bold">MOP</span>
          </div>
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              {navigationItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors
                    ${location.pathname === item.path
                      ? 'bg-indigo-900 text-white'
                      : 'text-indigo-100 hover:bg-indigo-700'
                    }
                  `}
                >
                  <span className="mr-4">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <main className="flex-1 relative">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;