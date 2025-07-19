import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Cpu,
  Wrench,
  Zap,
  Wifi,
  Shield,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  User,
  LogOut,
  UserCircle
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Device Hub', href: '/devices', icon: Cpu },
  { name: 'Maintenance', href: '/maintenance', icon: Wrench },
  { name: 'Energy', href: '/energy', icon: Zap },
  { name: 'Network', href: '/network', icon: Wifi },
  { name: 'Anomalies', href: '/anomalies', icon: Shield },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Profile', href: '/profile', icon: UserCircle },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onMobileClose }) => {
  const { sidebarCollapsed, setSidebarCollapsed } = useApp();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: sidebarCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-[#1A232E] border-r border-[#263340] flex flex-col h-full"
    >
      {/* Header */}
      <div className="p-6 border-b border-[#263340]">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
              <img 
                src="/logo/ark-wuiot logo.png" 
                alt="Ark-Wuiot Logo" 
                className="h-12 w-auto object-contain"
              />
            </motion.div>
          )}
          <div className="flex items-center space-x-2">
            {/* Mobile Close Button */}
            {onMobileClose && (
              <button
                onClick={onMobileClose}
                className="lg:hidden p-1.5 rounded-lg hover:bg-[#263340] text-[#B8C2CC] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            
            {/* Desktop Collapse Button */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:block p-1.5 rounded-lg hover:bg-[#263340] text-[#B8C2CC] hover:text-white transition-colors"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      {user && (
        <div className="p-4 border-b border-[#263340]">
          <div className="flex items-center space-x-3">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-[#00FF9D] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-black" />
              </div>
            )}
            
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex-1 min-w-0"
              >
                <p className="text-white font-medium truncate">{user.name}</p>
                <p className="text-[#B8C2CC] text-sm truncate capitalize">
                  {user.role?.replace('_', ' ')}
                </p>
                <p className="text-[#B8C2CC] text-xs truncate">{user.email}</p>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={onMobileClose} // Close mobile sidebar when navigating
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-[#00FF9D]/10 text-[#00FF9D] border border-[#00FF9D]/20'
                  : 'text-[#B8C2CC] hover:text-white hover:bg-[#263340]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon 
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-[#00FF9D]' : 'group-hover:text-white'
                  }`} 
                />
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer with Logout */}
      <div className="p-4 border-t border-[#263340] space-y-3">
        {/* Logout Button */}
        {user && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-[#FF4D4D] hover:text-white hover:bg-[#FF4D4D]/10 transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-medium"
              >
                Sign Out
              </motion.span>
            )}
          </button>
        )}

        {/* Powered by */}
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <p className="text-[#B8C2CC] text-xs mb-1">Powered by</p>
            <p className="text-[#00FF9D] text-sm font-semibold">Ark AI</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};