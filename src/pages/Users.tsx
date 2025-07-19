import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users as UsersIcon, 
  UserPlus, 
  Shield, 
  Key,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity,
  Settings,
  MoreHorizontal,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Lock,
  Unlock
} from 'lucide-react';
import { Card, StatCard } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const userActivityData = [
  { month: 'Jan', integrators: 45, clients: 78, admins: 12 },
  { month: 'Feb', integrators: 52, clients: 85, admins: 14 },
  { month: 'Mar', integrators: 48, clients: 92, admins: 13 },
  { month: 'Apr', integrators: 61, clients: 88, admins: 15 },
  { month: 'May', integrators: 55, clients: 95, admins: 16 },
  { month: 'Jun', integrators: 67, clients: 102, admins: 18 }
];

const roleDistributionData = [
  { name: 'Industrial Clients', value: 65, color: '#00FF9D' },
  { name: 'System Integrators', value: 28, color: '#00E0FF' },
  { name: 'Administrators', value: 7, color: '#FFD166' }
];

const loginActivityData = [
  { time: '00:00', logins: 5 },
  { time: '04:00', logins: 2 },
  { time: '08:00', logins: 45 },
  { time: '12:00', logins: 78 },
  { time: '16:00', logins: 65 },
  { time: '20:00', logins: 32 },
  { time: '24:00', logins: 12 }
];

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'integrator' | 'industrial_client';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: Date;
  joinDate: Date;
  location: string;
  phone?: string;
  devicesManaged: number;
  permissions: string[];
  avatar?: string;
}

const mockUsers: User[] = [
  {
    id: 'USR-001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    role: 'integrator',
    status: 'active',
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
    joinDate: new Date('2023-01-15'),
    location: 'San Francisco, CA',
    phone: '+1 (555) 123-4567',
    devicesManaged: 247,
    permissions: ['device_management', 'analytics_view', 'maintenance_schedule'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
  },
  {
    id: 'USR-002',
    name: 'Michael Chen',
    email: 'michael.chen@industrial.com',
    role: 'industrial_client',
    status: 'active',
    lastLogin: new Date(Date.now() - 30 * 60 * 1000),
    joinDate: new Date('2023-03-22'),
    location: 'Austin, TX',
    phone: '+1 (555) 987-6543',
    devicesManaged: 156,
    permissions: ['device_view', 'analytics_view', 'reports_download'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael'
  },
  {
    id: 'USR-003',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@arkwuiot.com',
    role: 'admin',
    status: 'active',
    lastLogin: new Date(Date.now() - 5 * 60 * 1000),
    joinDate: new Date('2022-11-08'),
    location: 'New York, NY',
    phone: '+1 (555) 456-7890',
    devicesManaged: 0,
    permissions: ['full_access', 'user_management', 'system_config', 'security_admin'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily'
  },
  {
    id: 'USR-004',
    name: 'David Kim',
    email: 'david.kim@manufacturing.com',
    role: 'industrial_client',
    status: 'inactive',
    lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    joinDate: new Date('2023-05-10'),
    location: 'Seattle, WA',
    devicesManaged: 89,
    permissions: ['device_view', 'analytics_view'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david'
  }
];

export const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-[#FFD166] bg-[#FFD166]/10';
      case 'integrator': return 'text-[#00E0FF] bg-[#00E0FF]/10';
      case 'industrial_client': return 'text-[#00FF9D] bg-[#00FF9D]/10';
      default: return 'text-[#B8C2CC] bg-[#B8C2CC]/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-[#2AFFB2] bg-[#2AFFB2]/10';
      case 'inactive': return 'text-[#B8C2CC] bg-[#B8C2CC]/10';
      case 'suspended': return 'text-[#FF4D4D] bg-[#FF4D4D]/10';
      default: return 'text-[#B8C2CC] bg-[#B8C2CC]/10';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'integrator': return <Settings className="w-4 h-4" />;
      case 'industrial_client': return <UsersIcon className="w-4 h-4" />;
      default: return <UsersIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-[#B8C2CC] mt-1">Manage users, roles, and permissions across the platform</p>
        </div>
        <div className="mt-4 lg:mt-0 flex items-center space-x-3">
          <Button variant="ghost" icon={Download}>
            Export Users
          </Button>
          <Button variant="primary" icon={UserPlus}>
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value="1,247"
          change="+23 this month"
          changeType="positive"
          icon={<UsersIcon className="w-6 h-6" />}
        />
        <StatCard
          title="Active Users"
          value="1,189"
          change="95.3% active rate"
          changeType="positive"
          icon={<Activity className="w-6 h-6" />}
        />
        <StatCard
          title="New Registrations"
          value="47"
          change="+12% this week"
          changeType="positive"
          icon={<UserPlus className="w-6 h-6" />}
        />
        <StatCard
          title="Security Alerts"
          value="3"
          change="-2 from last week"
          changeType="positive"
          icon={<Shield className="w-6 h-6" />}
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Activity Trends */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">User Activity Trends</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#00E0FF] rounded-full"></div>
                <span className="text-[#B8C2CC]">Integrators</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#00FF9D] rounded-full"></div>
                <span className="text-[#B8C2CC]">Clients</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#FFD166] rounded-full"></div>
                <span className="text-[#B8C2CC]">Admins</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#263340" />
              <XAxis dataKey="month" stroke="#B8C2CC" />
              <YAxis stroke="#B8C2CC" />
              <Bar dataKey="integrators" fill="#00E0FF" radius={[2, 2, 0, 0]} />
              <Bar dataKey="clients" fill="#00FF9D" radius={[2, 2, 0, 0]} />
              <Bar dataKey="admins" fill="#FFD166" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Role Distribution */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Role Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={roleDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {roleDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {roleDistributionData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-[#B8C2CC] text-sm">{item.name}</span>
                </div>
                <span className="text-white font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Login Activity */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Daily Login Activity</h3>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={loginActivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#263340" />
            <XAxis dataKey="time" stroke="#B8C2CC" />
            <YAxis stroke="#B8C2CC" />
            <Line 
              type="monotone" 
              dataKey="logins" 
              stroke="#00FF9D" 
              strokeWidth={3}
              dot={{ fill: '#00FF9D', strokeWidth: 2, r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* User Management Table */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">User Directory</h3>
          <div className="flex items-center space-x-3">
            <div className="flex-1 max-w-md">
              <Input
                icon={Search}
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-[#263340] border border-[#263340] rounded-lg px-3 py-2 text-[#E0E0E0] text-sm focus:outline-none focus:ring-2 focus:ring-[#00FF9D]"
            >
              <option value="all">All Roles</option>
              <option value="admin">Administrators</option>
              <option value="integrator">System Integrators</option>
              <option value="industrial_client">Industrial Clients</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#263340] border border-[#263340] rounded-lg px-3 py-2 text-[#E0E0E0] text-sm focus:outline-none focus:ring-2 focus:ring-[#00FF9D]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            <Button variant="ghost" icon={Filter} size="sm">
              More Filters
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#263340] rounded-lg p-6 hover:bg-[#2A3A47] transition-colors cursor-pointer"
              onClick={() => setSelectedUser(user)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img 
                    src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-white font-semibold">{user.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getRoleColor(user.role)}`}>
                        {getRoleIcon(user.role)}
                        <span>{user.role.replace('_', ' ')}</span>
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-[#B8C2CC]">
                        <Mail className="w-4 h-4" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[#B8C2CC]">
                        <MapPin className="w-4 h-4" />
                        <span>{user.location}</span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center space-x-2 text-[#B8C2CC]">
                          <Phone className="w-4 h-4" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 text-[#B8C2CC]">
                        <Activity className="w-4 h-4" />
                        <span>Last login: {user.lastLogin.toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2 text-[#B8C2CC]">
                        <Calendar className="w-4 h-4" />
                        <span>Joined: {user.joinDate.toLocaleDateString()}</span>
                      </div>
                      {user.devicesManaged > 0 && (
                        <div className="flex items-center space-x-2 text-[#B8C2CC]">
                          <Settings className="w-4 h-4" />
                          <span>{user.devicesManaged} devices managed</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 text-[#B8C2CC]">
                        <Key className="w-4 h-4" />
                        <span>{user.permissions.length} permissions</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" icon={Edit}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" icon={user.status === 'active' ? Lock : Unlock}>
                    {user.status === 'active' ? 'Suspend' : 'Activate'}
                  </Button>
                  <Button variant="ghost" size="sm" icon={MoreHorizontal}>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <UsersIcon className="w-12 h-12 text-[#B8C2CC] mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">No users found</h3>
            <p className="text-[#B8C2CC] mb-4">Try adjusting your search or filter criteria</p>
            <Button variant="primary" icon={UserPlus}>
              Add New User
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};