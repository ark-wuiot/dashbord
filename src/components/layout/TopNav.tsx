import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

interface TopNavProps {
  onMobileMenuClick?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onMobileMenuClick }) => {
  const { user, logout } = useAuth();
  const { notifications, showNotifications, setShowNotifications } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.length;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <div className="bg-[#1A232E] border-b border-[#263340] px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMobileMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-[#263340] text-[#B8C2CC] hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#B8C2CC]" />
            <input
              type="text"
              placeholder="Search devices, alerts, or users..."
              className="w-80 bg-[#263340] border border-transparent rounded-lg pl-10 pr-4 py-2 text-[#E0E0E0] placeholder-[#B8C2CC] focus:outline-none focus:ring-2 focus:ring-[#00FF9D] focus:border-[#00FF9D] transition-all duration-200"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* AI Optimization Badge */}
          <div className="hidden md:flex items-center space-x-2 bg-[#00FF9D]/10 border border-[#00FF9D]/20 rounded-lg px-3 py-1.5">
            <div className="w-2 h-2 bg-[#00FF9D] rounded-full animate-pulse"></div>
            <span className="text-[#00FF9D] text-sm font-medium">AI Optimized</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-[#263340] text-[#B8C2CC] hover:text-white transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF4D4D] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-[#1A232E] border border-[#263340] rounded-xl shadow-2xl z-50"
                >
                  <div className="p-4 border-b border-[#263340]">
                    <h3 className="text-white font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div key={notification.id} className="p-4 border-b border-[#263340] last:border-0">
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'success' ? 'bg-[#2AFFB2]' :
                              notification.type === 'error' ? 'bg-[#FF4D4D]' :
                              notification.type === 'warning' ? 'bg-[#FFD166]' :
                              'bg-[#00E0FF]'
                            }`}></div>
                            <div className="flex-1">
                              <p className="text-white text-sm font-medium">{notification.title}</p>
                              <p className="text-[#B8C2CC] text-sm mt-1">{notification.message}</p>
                              <p className="text-[#B8C2CC] text-xs mt-1">
                                {notification.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-[#B8C2CC]">
                        No notifications
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#263340] transition-colors"
            >
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 bg-[#00FF9D] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-black" />
                </div>
              )}
              <div className="hidden md:block text-left">
                <p className="text-white text-sm font-medium">{user?.name}</p>
                <p className="text-[#B8C2CC] text-xs capitalize">{user?.role?.replace('_', ' ')}</p>
              </div>
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-[#1A232E] border border-[#263340] rounded-xl shadow-2xl z-50"
                >
                  {/* User Info */}
                  <div className="p-3 border-b border-[#263340]">
                    <div className="flex items-center space-x-3">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-[#00FF9D] rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-black" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{user?.name}</p>
                        <p className="text-[#B8C2CC] text-xs truncate">{user?.email}</p>
                        <p className="text-[#00FF9D] text-xs capitalize">{user?.role?.replace('_', ' ')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-[#FF4D4D] hover:text-white hover:bg-[#FF4D4D]/10 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};