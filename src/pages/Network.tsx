import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wifi, 
  Signal, 
  Globe, 
  Router,
  Smartphone,
  Monitor,
  Server,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Download,
  Settings,
  RefreshCw
} from 'lucide-react';
import { Card, StatCard } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter } from 'recharts';

const networkLatencyData = [
  { time: '00:00', latency: 12, throughput: 850, packetLoss: 0.1 },
  { time: '04:00', latency: 8, throughput: 920, packetLoss: 0.05 },
  { time: '08:00', latency: 15, throughput: 780, packetLoss: 0.2 },
  { time: '12:00', latency: 18, throughput: 650, packetLoss: 0.3 },
  { time: '16:00', latency: 22, throughput: 590, packetLoss: 0.4 },
  { time: '20:00', latency: 16, throughput: 720, packetLoss: 0.2 },
  { time: '24:00', latency: 11, throughput: 880, packetLoss: 0.1 }
];

const bandwidthUsageData = [
  { hour: '6AM', upload: 45, download: 120, total: 165 },
  { hour: '9AM', upload: 78, download: 210, total: 288 },
  { hour: '12PM', upload: 92, download: 280, total: 372 },
  { hour: '3PM', upload: 105, download: 320, total: 425 },
  { hour: '6PM', upload: 88, download: 250, total: 338 },
  { hour: '9PM', upload: 65, download: 180, total: 245 },
  { hour: '12AM', upload: 35, download: 95, total: 130 }
];

const deviceConnectivityData = [
  { device: 'IoT Sensors', connected: 247, total: 250, signalStrength: 95 },
  { device: 'Smart Cameras', connected: 45, total: 48, signalStrength: 88 },
  { device: 'Controllers', connected: 32, total: 35, signalStrength: 92 },
  { device: 'Gateways', connected: 12, total: 12, signalStrength: 98 },
  { device: 'Mobile Devices', connected: 156, total: 180, signalStrength: 85 }
];

const networkTopologyData = [
  { node: 'Gateway-1', x: 100, y: 150, connections: 45, status: 'healthy' },
  { node: 'Gateway-2', x: 300, y: 100, connections: 38, status: 'healthy' },
  { node: 'Gateway-3', x: 500, y: 200, connections: 52, status: 'warning' },
  { node: 'Gateway-4', x: 200, y: 300, connections: 41, status: 'healthy' },
  { node: 'Gateway-5', x: 400, y: 350, connections: 29, status: 'critical' }
];

const securityEventsData = [
  { time: '00:00', attempts: 5, blocked: 4, allowed: 1 },
  { time: '04:00', attempts: 2, blocked: 2, allowed: 0 },
  { time: '08:00', attempts: 12, blocked: 10, allowed: 2 },
  { time: '12:00', attempts: 18, blocked: 15, allowed: 3 },
  { time: '16:00', attempts: 25, blocked: 22, allowed: 3 },
  { time: '20:00', attempts: 15, blocked: 13, allowed: 2 },
  { time: '24:00', attempts: 8, blocked: 7, allowed: 1 }
];

interface NetworkAlert {
  id: string;
  type: 'latency' | 'connectivity' | 'security' | 'bandwidth';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  affected: string;
}

const mockAlerts: NetworkAlert[] = [
  {
    id: 'NET-001',
    type: 'latency',
    severity: 'high',
    message: 'High latency detected on Gateway-3',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    affected: 'Gateway-3'
  },
  {
    id: 'NET-002',
    type: 'connectivity',
    severity: 'critical',
    message: 'Connection lost to 3 IoT sensors in Sector B',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    affected: 'Sector B'
  },
  {
    id: 'NET-003',
    type: 'security',
    severity: 'medium',
    message: 'Unusual traffic pattern detected',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    affected: 'Network-Wide'
  }
];

export const Network: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedView, setSelectedView] = useState('overview');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-[#FF4D4D] bg-[#FF4D4D]/10';
      case 'high': return 'text-[#FFD166] bg-[#FFD166]/10';
      case 'medium': return 'text-[#00E0FF] bg-[#00E0FF]/10';
      case 'low': return 'text-[#2AFFB2] bg-[#2AFFB2]/10';
      default: return 'text-[#B8C2CC] bg-[#B8C2CC]/10';
    }
  };

  const getSignalBars = (strength: number) => {
    const bars = Math.ceil(strength / 25);
    return Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className={`w-1 h-3 rounded-full ${
          i < bars ? 'bg-[#00FF9D]' : 'bg-[#263340]'
        }`}
      />
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return '#2AFFB2';
      case 'warning': return '#FFD166';
      case 'critical': return '#FF4D4D';
      default: return '#B8C2CC';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Network Diagnostics</h1>
          <p className="text-[#B8C2CC] mt-1">Real-time network monitoring and performance analytics</p>
        </div>
        <div className="mt-4 lg:mt-0 flex items-center space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-[#263340] border border-[#263340] rounded-lg px-3 py-2 text-[#E0E0E0] text-sm focus:outline-none focus:ring-2 focus:ring-[#00FF9D]"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <Button variant="ghost" icon={RefreshCw}>
            Refresh
          </Button>
          <Button variant="ghost" icon={Download}>
            Export
          </Button>
          <Button variant="primary" icon={Settings}>
            Configure
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Network Uptime"
          value="99.8%"
          change="+0.1% this month"
          changeType="positive"
          icon={<Globe className="w-6 h-6" />}
        />
        <StatCard
          title="Average Latency"
          value="14ms"
          change="-2ms improvement"
          changeType="positive"
          icon={<Signal className="w-6 h-6" />}
        />
        <StatCard
          title="Connected Devices"
          value="492/505"
          change="13 offline"
          changeType="neutral"
          icon={<Wifi className="w-6 h-6" />}
        />
        <StatCard
          title="Bandwidth Usage"
          value="67%"
          change="+5% from yesterday"
          changeType="neutral"
          icon={<TrendingUp className="w-6 h-6" />}
        />
      </div>

      {/* Network Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latency & Throughput */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Latency & Throughput</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#FF4D4D] rounded-full"></div>
                <span className="text-[#B8C2CC]">Latency (ms)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#00FF9D] rounded-full"></div>
                <span className="text-[#B8C2CC]">Throughput (Mbps)</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={networkLatencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#263340" />
              <XAxis dataKey="time" stroke="#B8C2CC" />
              <YAxis stroke="#B8C2CC" />
              <Line 
                type="monotone" 
                dataKey="latency" 
                stroke="#FF4D4D" 
                strokeWidth={3}
                dot={{ fill: '#FF4D4D', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="throughput" 
                stroke="#00FF9D" 
                strokeWidth={3}
                dot={{ fill: '#00FF9D', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Bandwidth Usage */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Bandwidth Usage</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#00E0FF] rounded-full"></div>
                <span className="text-[#B8C2CC]">Upload</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#00FF9D] rounded-full"></div>
                <span className="text-[#B8C2CC]">Download</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={bandwidthUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#263340" />
              <XAxis dataKey="hour" stroke="#B8C2CC" />
              <YAxis stroke="#B8C2CC" />
              <Area 
                type="monotone" 
                dataKey="upload" 
                stackId="1"
                stroke="#00E0FF" 
                fill="#00E0FF" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="download" 
                stackId="1"
                stroke="#00FF9D" 
                fill="#00FF9D" 
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Device Connectivity Status */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Device Connectivity Status</h3>
          <Button variant="ghost" icon={RefreshCw} size="sm">
            Refresh Status
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {deviceConnectivityData.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#263340] rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {category.device === 'IoT Sensors' && <Smartphone className="w-4 h-4 text-[#00FF9D]" />}
                  {category.device === 'Smart Cameras' && <Monitor className="w-4 h-4 text-[#00E0FF]" />}
                  {category.device === 'Controllers' && <Server className="w-4 h-4 text-[#FFD166]" />}
                  {category.device === 'Gateways' && <Router className="w-4 h-4 text-[#2AFFB2]" />}
                  {category.device === 'Mobile Devices' && <Smartphone className="w-4 h-4 text-[#FF4D4D]" />}
                  <h4 className="text-white font-medium text-sm">{category.device}</h4>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#B8C2CC] text-sm">Connected</span>
                  <span className="text-white font-semibold">{category.connected}/{category.total}</span>
                </div>
                
                <div className="w-full bg-[#1A232E] rounded-full h-2">
                  <div 
                    className="h-2 bg-[#00FF9D] rounded-full transition-all duration-500"
                    style={{ width: `${(category.connected / category.total) * 100}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-[#B8C2CC] text-sm">Signal</span>
                  <div className="flex items-center space-x-1">
                    {getSignalBars(category.signalStrength)}
                    <span className="text-[#B8C2CC] text-xs ml-2">{category.signalStrength}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Network Topology & Security */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Network Topology */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Network Topology</h3>
            <Button variant="ghost" icon={Settings} size="sm">
              Configure
            </Button>
          </div>
          <div className="relative h-80 bg-[#1A232E] rounded-lg p-4">
            <svg className="w-full h-full">
              {/* Connection lines */}
              <g stroke="#263340" strokeWidth="2" fill="none">
                <line x1="100" y1="150" x2="300" y2="100" />
                <line x1="100" y1="150" x2="200" y2="300" />
                <line x1="300" y1="100" x2="500" y2="200" />
                <line x1="300" y1="100" x2="400" y2="350" />
                <line x1="500" y1="200" x2="400" y2="350" />
                <line x1="200" y1="300" x2="400" y2="350" />
              </g>
              
              {/* Nodes */}
              {networkTopologyData.map((node, index) => (
                <g key={index}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="20"
                    fill={getStatusColor(node.status)}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                  />
                  <text
                    x={node.x}
                    y={node.y + 35}
                    textAnchor="middle"
                    className="text-xs fill-[#B8C2CC]"
                  >
                    {node.node}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 48}
                    textAnchor="middle"
                    className="text-xs fill-[#B8C2CC]"
                  >
                    {node.connections} devices
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#2AFFB2] rounded-full"></div>
              <span className="text-[#B8C2CC]">Healthy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#FFD166] rounded-full"></div>
              <span className="text-[#B8C2CC]">Warning</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#FF4D4D] rounded-full"></div>
              <span className="text-[#B8C2CC]">Critical</span>
            </div>
          </div>
        </Card>

        {/* Security Events */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Security Events</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={securityEventsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#263340" />
              <XAxis dataKey="time" stroke="#B8C2CC" />
              <YAxis stroke="#B8C2CC" />
              <Bar dataKey="blocked" fill="#00FF9D" radius={[2, 2, 0, 0]} />
              <Bar dataKey="allowed" fill="#FF4D4D" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-[#263340] rounded-lg">
              <p className="text-[#00FF9D] font-semibold">73</p>
              <p className="text-[#B8C2CC] text-xs">Threats Blocked</p>
            </div>
            <div className="text-center p-3 bg-[#263340] rounded-lg">
              <p className="text-[#FF4D4D] font-semibold">11</p>
              <p className="text-[#B8C2CC] text-xs">Allowed Connections</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Network Alerts */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Active Network Alerts</h3>
          <div className="flex items-center space-x-2">
            <span className="text-[#B8C2CC] text-sm">{mockAlerts.length} active alerts</span>
          </div>
        </div>
        <div className="space-y-4">
          {mockAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#263340] rounded-lg p-4 hover:bg-[#2A3A47] transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {alert.type === 'latency' && <Signal className="w-5 h-5 text-[#FFD166]" />}
                    {alert.type === 'connectivity' && <Wifi className="w-5 h-5 text-[#FF4D4D]" />}
                    {alert.type === 'security' && <AlertTriangle className="w-5 h-5 text-[#00E0FF]" />}
                    {alert.type === 'bandwidth' && <TrendingUp className="w-5 h-5 text-[#00FF9D]" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-white font-medium">{alert.message}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-[#B8C2CC]">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{alert.timestamp.toLocaleTimeString()}</span>
                      </div>
                      <span>Affected: {alert.affected}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    Investigate
                  </Button>
                  <Button variant="ghost" size="sm">
                    Resolve
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};