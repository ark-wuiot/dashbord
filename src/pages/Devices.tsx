import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Cpu, 
  Activity, 
  Wifi, 
  Battery,
  MoreHorizontal,
  Play,
  Pause,
  Settings
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

interface Device {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'maintenance';
  location: string;
  battery?: number;
  signalStrength: number;
  lastSeen: Date;
  firmware: string;
}

const mockDevices: Device[] = [
  {
    id: 'DEV-001',
    name: 'Temperature Sensor #247',
    type: 'Environmental Sensor',
    status: 'online',
    location: 'Building A - Floor 3',
    battery: 87,
    signalStrength: 95,
    lastSeen: new Date(),
    firmware: 'v2.3.1'
  },
  {
    id: 'DEV-002',
    name: 'Smart Pump Controller',
    type: 'Industrial Controller',
    status: 'online',
    location: 'Facility B - Sector C',
    signalStrength: 78,
    lastSeen: new Date(Date.now() - 2 * 60 * 1000),
    firmware: 'v1.8.4'
  },
  {
    id: 'DEV-003',
    name: 'Vibration Monitor',
    type: 'Predictive Sensor',
    status: 'maintenance',
    location: 'Production Line 1',
    battery: 45,
    signalStrength: 82,
    lastSeen: new Date(Date.now() - 15 * 60 * 1000),
    firmware: 'v2.1.0'
  },
  {
    id: 'DEV-004',
    name: 'Energy Meter #156',
    type: 'Power Monitor',
    status: 'offline',
    location: 'Building C - Basement',
    signalStrength: 0,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
    firmware: 'v1.9.2'
  }
];

export const Devices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const filteredDevices = mockDevices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-[#2AFFB2] bg-[#2AFFB2]/10';
      case 'offline': return 'text-[#FF4D4D] bg-[#FF4D4D]/10';
      case 'maintenance': return 'text-[#FFD166] bg-[#FFD166]/10';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Device Orchestration Hub</h1>
          <p className="text-[#B8C2CC] mt-1">Manage and monitor all connected devices</p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Button variant="primary" icon={Plus}>
            Add Device
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <Input
              icon={Search}
              placeholder="Search devices, types, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#263340] border border-[#263340] rounded-lg px-4 py-2 text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#00FF9D]"
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="maintenance">Maintenance</option>
            </select>
            <Button variant="ghost" icon={Filter} size="sm">
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Device Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#00FF9D]/10 rounded-lg">
              <Cpu className="w-6 h-6 text-[#00FF9D]" />
            </div>
            <div>
              <p className="text-[#B8C2CC] text-sm">Total Devices</p>
              <p className="text-white text-2xl font-bold">1,247</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#2AFFB2]/10 rounded-lg">
              <Activity className="w-6 h-6 text-[#2AFFB2]" />
            </div>
            <div>
              <p className="text-[#B8C2CC] text-sm">Online</p>
              <p className="text-white text-2xl font-bold">1,189</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#FFD166]/10 rounded-lg">
              <Settings className="w-6 h-6 text-[#FFD166]" />
            </div>
            <div>
              <p className="text-[#B8C2CC] text-sm">Maintenance</p>
              <p className="text-white text-2xl font-bold">23</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#FF4D4D]/10 rounded-lg">
              <Wifi className="w-6 h-6 text-[#FF4D4D]" />
            </div>
            <div>
              <p className="text-[#B8C2CC] text-sm">Offline</p>
              <p className="text-white text-2xl font-bold">35</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDevices.map((device, index) => (
          <motion.div
            key={device.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:scale-105 transition-transform">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{device.name}</h3>
                  <p className="text-[#B8C2CC] text-sm">{device.type}</p>
                  <p className="text-[#B8C2CC] text-xs mt-1">{device.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                    {device.status}
                  </span>
                  <button className="p-1 hover:bg-[#263340] rounded text-[#B8C2CC] hover:text-white">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {/* Signal Strength */}
                <div className="flex items-center justify-between">
                  <span className="text-[#B8C2CC] text-sm">Signal</span>
                  <div className="flex items-center space-x-1">
                    {getSignalBars(device.signalStrength)}
                    <span className="text-[#B8C2CC] text-xs ml-2">{device.signalStrength}%</span>
                  </div>
                </div>

                {/* Battery (if available) */}
                {device.battery !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#B8C2CC] text-sm">Battery</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-2 bg-[#263340] rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            device.battery > 50 ? 'bg-[#2AFFB2]' :
                            device.battery > 20 ? 'bg-[#FFD166]' : 'bg-[#FF4D4D]'
                          }`}
                          style={{ width: `${device.battery}%` }}
                        />
                      </div>
                      <span className="text-[#B8C2CC] text-xs">{device.battery}%</span>
                    </div>
                  </div>
                )}

                {/* Last Seen */}
                <div className="flex items-center justify-between">
                  <span className="text-[#B8C2CC] text-sm">Last Seen</span>
                  <span className="text-[#B8C2CC] text-xs">
                    {device.lastSeen.toLocaleTimeString()}
                  </span>
                </div>

                {/* Firmware */}
                <div className="flex items-center justify-between">
                  <span className="text-[#B8C2CC] text-sm">Firmware</span>
                  <span className="text-[#B8C2CC] text-xs">{device.firmware}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-[#263340]">
                <Button variant="ghost" size="sm" icon={device.status === 'online' ? Pause : Play}>
                  {device.status === 'online' ? 'Pause' : 'Start'}
                </Button>
                <Button variant="ghost" size="sm" icon={Settings}>
                  Configure
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <Cpu className="w-12 h-12 text-[#B8C2CC] mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">No devices found</h3>
            <p className="text-[#B8C2CC] mb-4">Try adjusting your search or filter criteria</p>
            <Button variant="primary" icon={Plus}>
              Add Your First Device
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};