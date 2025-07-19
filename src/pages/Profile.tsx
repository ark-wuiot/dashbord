import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Shield, 
  Calendar, 
  Edit, 
  Save, 
  X,
  Camera,
  Key,
  Bell,
  Globe
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'industrial_client'
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#FF4D4D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-[#FF4D4D]" />
          </div>
          <h2 className="text-white text-xl font-semibold mb-2">User Not Found</h2>
          <p className="text-[#B8C2CC]">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    // Here you would typically update the user profile in Firestore
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setIsEditing(false);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">User Profile</h1>
        <p className="text-[#B8C2CC]">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-[#1A232E] border border-[#263340] rounded-xl p-6">
            {/* Avatar Section */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 bg-[#00FF9D] rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-12 h-12 text-black" />
                  </div>
                )}
                <button className="absolute bottom-4 right-0 p-2 bg-[#263340] rounded-full hover:bg-[#00FF9D] hover:text-black transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <h2 className="text-xl font-semibold text-white mb-1">{user.name}</h2>
              <p className="text-[#B8C2CC] text-sm capitalize">{user.role?.replace('_', ' ')}</p>
            </div>

            {/* Quick Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#263340] rounded-lg">
                <span className="text-[#B8C2CC] text-sm">Account Status</span>
                <span className="text-[#00FF9D] text-sm font-medium">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#263340] rounded-lg">
                <span className="text-[#B8C2CC] text-sm">Member Since</span>
                <span className="text-white text-sm">{formatDate(user.createdAt)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="bg-[#1A232E] border border-[#263340] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Profile Information</h3>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="secondary"
                size="sm"
                className="flex items-center space-x-2"
              >
                {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                <span>{isEditing ? 'Cancel' : 'Edit'}</span>
              </Button>
            </div>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <Input
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-[#263340] rounded-lg">
                    <User className="w-5 h-5 text-[#B8C2CC]" />
                    <span className="text-white">{user.name}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-[#263340] rounded-lg">
                    <Mail className="w-5 h-5 text-[#B8C2CC]" />
                    <span className="text-white">{user.email}</span>
                  </div>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                  Account Type
                </label>
                {isEditing ? (
                  <select
                    value={editedUser.role}
                    onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                    className="w-full bg-[#263340] border border-[#263340] rounded-lg px-4 py-3 text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#00FF9D] focus:border-[#00FF9D]"
                  >
                    <option value="integrator">System Integrator</option>
                    <option value="industrial_client">Industrial Client</option>
                  </select>
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-[#263340] rounded-lg">
                    <Shield className="w-5 h-5 text-[#B8C2CC]" />
                    <span className="text-white capitalize">{user.role?.replace('_', ' ')}</span>
                  </div>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                  Phone Number
                </label>
                <div className="flex items-center space-x-3 p-3 bg-[#263340] rounded-lg">
                  <Globe className="w-5 h-5 text-[#B8C2CC]" />
                  <span className="text-white">{user.phoneNumber || 'Not provided'}</span>
                </div>
              </div>

              {/* Created Date */}
              <div>
                <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                  Account Created
                </label>
                <div className="flex items-center space-x-3 p-3 bg-[#263340] rounded-lg">
                  <Calendar className="w-5 h-5 text-[#B8C2CC]" />
                  <span className="text-white">{formatDate(user.createdAt)}</span>
                </div>
              </div>

              {/* Save Button */}
              {isEditing && (
                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={handleSave}
                    variant="primary"
                    className="flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Security & Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 bg-[#1A232E] border border-[#263340] rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Security & Preferences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center space-x-3 p-4 bg-[#263340] rounded-lg hover:bg-[#263340]/80 transition-colors">
                <Key className="w-5 h-5 text-[#00FF9D]" />
                <div className="text-left">
                  <p className="text-white font-medium">Change Password</p>
                  <p className="text-[#B8C2CC] text-sm">Update your account password</p>
                </div>
              </button>

              <button className="flex items-center space-x-3 p-4 bg-[#263340] rounded-lg hover:bg-[#263340]/80 transition-colors">
                <Bell className="w-5 h-5 text-[#00FF9D]" />
                <div className="text-left">
                  <p className="text-white font-medium">Notification Settings</p>
                  <p className="text-[#B8C2CC] text-sm">Manage your notifications</p>
                </div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}; 