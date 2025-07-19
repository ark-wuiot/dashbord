import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Cpu, 
  Zap, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Users
} from 'lucide-react';
import { Card, StatCard } from '../components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';

const devicePerformanceData = [
  { time: '00:00', performance: 85, energy: 120 },
  { time: '04:00', performance: 78, energy: 95 },
  { time: '08:00', performance: 92, energy: 140 },
  { time: '12:00', performance: 88, energy: 160 },
  { time: '16:00', performance: 95, energy: 180 },
  { time: '20:00', performance: 90, energy: 150 },
  { time: '24:00', performance: 87, energy: 130 }
];

const networkStatusData = [
  { time: '00:00', latency: 12, throughput: 850 },
  { time: '04:00', latency: 8, throughput: 920 },
  { time: '08:00', latency: 15, throughput: 780 },
  { time: '12:00', latency: 18, throughput: 650 },
  { time: '16:00', latency: 22, throughput: 590 },
  { time: '20:00', latency: 16, throughput: 720 },
  { time: '24:00', latency: 11, throughput: 880 }
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-[#B8C2CC] mt-1">Real-time insights and system performance</p>
        </div>
        <div className="mt-4 lg:mt-0 flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-[#00FF9D]/10 border border-[#00FF9D]/20 rounded-lg px-3 py-2">
            <div className="w-2 h-2 bg-[#00FF9D] rounded-full animate-pulse"></div>
            <span className="text-[#00FF9D] text-sm font-medium">AI Optimized</span>
          </div>
          <div className="text-[#B8C2CC] text-sm">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Devices"
          value="1,247"
          change="+12% from last month"
          changeType="positive"
          icon={<Cpu className="w-6 h-6" />}
        />
        <StatCard
          title="System Health"
          value="98.7%"
          change="+0.3% from yesterday"
          changeType="positive"
          icon={<Activity className="w-6 h-6" />}
        />
        <StatCard
          title="Energy Efficiency"
          value="87.2%"
          change="+5.1% this week"
          changeType="positive"
          icon={<Zap className="w-6 h-6" />}
        />
        <StatCard
          title="Anomalies Detected"
          value="3"
          change="-45% from last week"
          changeType="positive"
          icon={<Shield className="w-6 h-6" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Performance Chart */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Device Performance</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#00FF9D] rounded-full"></div>
                <span className="text-[#B8C2CC]">Performance</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#00E0FF] rounded-full"></div>
                <span className="text-[#B8C2CC]">Energy Usage</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={devicePerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#263340" />
              <XAxis dataKey="time" stroke="#B8C2CC" />
              <YAxis stroke="#B8C2CC" />
              <Line 
                type="monotone" 
                dataKey="performance" 
                stroke="#00FF9D" 
                strokeWidth={2}
                dot={{ fill: '#00FF9D', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke="#00E0FF" 
                strokeWidth={2}
                dot={{ fill: '#00E0FF', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Network Status Chart */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Network Status</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#FFD166] rounded-full"></div>
                <span className="text-[#B8C2CC]">Latency (ms)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#00E0FF] rounded-full"></div>
                <span className="text-[#B8C2CC]">Throughput (Mbps)</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={networkStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#263340" />
              <XAxis dataKey="time" stroke="#B8C2CC" />
              <YAxis stroke="#B8C2CC" />
              <Area 
                type="monotone" 
                dataKey="throughput" 
                stackId="1"
                stroke="#00E0FF" 
                fill="#00E0FF" 
                fillOpacity={0.3}
              />
              <Area 
                type="monotone" 
                dataKey="latency" 
                stackId="2"
                stroke="#FFD166" 
                fill="#FFD166" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              {
                icon: <CheckCircle className="w-5 h-5 text-[#2AFFB2]" />,
                title: 'Device #247 Connected',
                description: 'Smart sensor successfully joined the network',
                time: '2 minutes ago'
              },
              {
                icon: <TrendingUp className="w-5 h-5 text-[#00FF9D]" />,
                title: 'Energy Optimization Applied',
                description: 'AI reduced power consumption by 12% on Sector C',
                time: '15 minutes ago'
              },
              {
                icon: <AlertTriangle className="w-5 h-5 text-[#FFD166]" />,
                title: 'Maintenance Alert',
                description: 'Pump Unit #12 requires attention in 3 days',
                time: '1 hour ago'
              },
              {
                icon: <Users className="w-5 h-5 text-[#00E0FF]" />,
                title: 'New User Registered',
                description: 'john.doe@company.com joined as Industrial Client',
                time: '2 hours ago'
              }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#263340] transition-colors"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.title}</p>
                  <p className="text-[#B8C2CC] text-sm mt-1">{activity.description}</p>
                  <p className="text-[#B8C2CC] text-xs mt-1">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* System Status */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-6">System Status</h3>
          <div className="space-y-4">
            {[
              { name: 'API Gateway', status: 'operational', uptime: '99.9%' },
              { name: 'Database Cluster', status: 'operational', uptime: '99.8%' },
              { name: 'Message Queue', status: 'operational', uptime: '100%' },
              { name: 'AI Processing', status: 'operational', uptime: '99.7%' },
              { name: 'Edge Nodes', status: 'degraded', uptime: '97.2%' }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#263340] rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    service.status === 'operational' ? 'bg-[#2AFFB2]' : 
                    service.status === 'degraded' ? 'bg-[#FFD166]' : 'bg-[#FF4D4D]'
                  }`}></div>
                  <span className="text-white text-sm font-medium">{service.name}</span>
                </div>
                <span className="text-[#B8C2CC] text-sm">{service.uptime}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};