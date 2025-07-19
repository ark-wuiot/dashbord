import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  TrendingDown, 
  TrendingUp, 
  Leaf, 
  DollarSign,
  Calendar,
  Download,
  Settings,
  Sun,
  Wind,
  Battery,
  Home
} from 'lucide-react';
import { Card, StatCard } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const energyConsumptionData = [
  { time: '00:00', consumption: 120, production: 80, cost: 15.2 },
  { time: '04:00', consumption: 95, production: 60, cost: 12.1 },
  { time: '08:00', consumption: 180, production: 140, cost: 22.5 },
  { time: '12:00', consumption: 220, production: 200, cost: 28.6 },
  { time: '16:00', consumption: 195, production: 180, cost: 24.8 },
  { time: '20:00', consumption: 165, production: 120, cost: 20.3 },
  { time: '24:00', consumption: 140, production: 90, cost: 17.8 }
];

const monthlyTrendsData = [
  { month: 'Jan', consumption: 15420, cost: 1842, savings: 320 },
  { month: 'Feb', consumption: 14890, cost: 1787, savings: 410 },
  { month: 'Mar', consumption: 16200, cost: 1944, savings: 380 },
  { month: 'Apr', consumption: 15100, cost: 1812, savings: 450 },
  { month: 'May', consumption: 14650, cost: 1758, savings: 520 },
  { month: 'Jun', consumption: 13980, cost: 1678, savings: 580 }
];

const energySourcesData = [
  { name: 'Grid Power', value: 45, color: '#FF4D4D', cost: 0.12 },
  { name: 'Solar', value: 30, color: '#FFD166', cost: 0.03 },
  { name: 'Wind', value: 15, color: '#00E0FF', cost: 0.04 },
  { name: 'Battery', value: 10, color: '#00FF9D', cost: 0.02 }
];

const deviceEfficiencyData = [
  { device: 'HVAC System', efficiency: 87, consumption: 45, potential: 12 },
  { device: 'Lighting', efficiency: 92, consumption: 25, potential: 5 },
  { device: 'Motors', efficiency: 78, consumption: 35, potential: 18 },
  { device: 'Pumps', efficiency: 85, consumption: 20, potential: 8 },
  { device: 'Compressors', efficiency: 73, consumption: 30, potential: 22 }
];

const peakDemandData = [
  { hour: '6AM', demand: 85, baseline: 70 },
  { hour: '9AM', demand: 145, baseline: 120 },
  { hour: '12PM', demand: 180, baseline: 150 },
  { hour: '3PM', demand: 195, baseline: 160 },
  { hour: '6PM', demand: 220, baseline: 180 },
  { hour: '9PM', demand: 165, baseline: 140 },
  { hour: '12AM', demand: 95, baseline: 80 }
];

const carbonFootprintData = [
  { month: 'Jan', emissions: 12.5, offset: 8.2, net: 4.3 },
  { month: 'Feb', emissions: 11.8, offset: 9.1, net: 2.7 },
  { month: 'Mar', emissions: 13.2, offset: 8.8, net: 4.4 },
  { month: 'Apr', emissions: 12.1, offset: 9.5, net: 2.6 },
  { month: 'May', emissions: 11.4, offset: 10.2, net: 1.2 },
  { month: 'Jun', emissions: 10.9, offset: 10.8, net: 0.1 }
];

export const Energy: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('consumption');

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return '#2AFFB2';
    if (efficiency >= 80) return '#00FF9D';
    if (efficiency >= 70) return '#FFD166';
    return '#FF4D4D';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Energy Optimization</h1>
          <p className="text-[#B8C2CC] mt-1">AI-powered energy management and sustainability insights</p>
        </div>
        <div className="mt-4 lg:mt-0 flex items-center space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-[#263340] border border-[#263340] rounded-lg px-3 py-2 text-[#E0E0E0] text-sm focus:outline-none focus:ring-2 focus:ring-[#00FF9D]"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <Button variant="ghost" icon={Download}>
            Export Report
          </Button>
          <Button variant="primary" icon={Settings}>
            Optimize Settings
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Current Usage"
          value="187 kWh"
          change="-12% from yesterday"
          changeType="positive"
          icon={<Zap className="w-6 h-6" />}
        />
        <StatCard
          title="Cost Savings"
          value="$2,847"
          change="+18% this month"
          changeType="positive"
          icon={<DollarSign className="w-6 h-6" />}
        />
        <StatCard
          title="Efficiency Score"
          value="87.3%"
          change="+5.2% improvement"
          changeType="positive"
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <StatCard
          title="Carbon Offset"
          value="2.1 tons"
          change="+0.8 tons this month"
          changeType="positive"
          icon={<Leaf className="w-6 h-6" />}
        />
      </div>

      {/* Real-time Energy Flow */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Real-time Energy Flow</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#FF4D4D] rounded-full"></div>
              <span className="text-[#B8C2CC]">Consumption</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#00FF9D] rounded-full"></div>
              <span className="text-[#B8C2CC]">Production</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#FFD166] rounded-full"></div>
              <span className="text-[#B8C2CC]">Cost</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={energyConsumptionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#263340" />
            <XAxis dataKey="time" stroke="#B8C2CC" />
            <YAxis stroke="#B8C2CC" />
            <Area 
              type="monotone" 
              dataKey="consumption" 
              stackId="1"
              stroke="#FF4D4D" 
              fill="#FF4D4D" 
              fillOpacity={0.3}
            />
            <Area 
              type="monotone" 
              dataKey="production" 
              stackId="2"
              stroke="#00FF9D" 
              fill="#00FF9D" 
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Energy Sources & Peak Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Sources */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Energy Sources</h3>
          </div>
          <div className="flex items-center justify-center mb-6">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={energySourcesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {energySourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {energySourcesData.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#263340] rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: source.color }}></div>
                  <div className="flex items-center space-x-2">
                    {source.name === 'Solar' && <Sun className="w-4 h-4 text-[#FFD166]" />}
                    {source.name === 'Wind' && <Wind className="w-4 h-4 text-[#00E0FF]" />}
                    {source.name === 'Battery' && <Battery className="w-4 h-4 text-[#00FF9D]" />}
                    {source.name === 'Grid Power' && <Home className="w-4 h-4 text-[#FF4D4D]" />}
                    <span className="text-white font-medium">{source.name}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{source.value}%</p>
                  <p className="text-[#B8C2CC] text-xs">${source.cost}/kWh</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Peak Demand Analysis */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Peak Demand Analysis</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={peakDemandData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#263340" />
              <XAxis dataKey="hour" stroke="#B8C2CC" />
              <YAxis stroke="#B8C2CC" />
              <Bar dataKey="baseline" fill="#263340" radius={[2, 2, 0, 0]} />
              <Bar dataKey="demand" fill="#00FF9D" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-[#263340] rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-[#B8C2CC] text-sm">Peak Demand Today</span>
              <span className="text-white font-semibold">220 kW at 6PM</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[#B8C2CC] text-sm">Demand Charge</span>
              <span className="text-[#FFD166] font-semibold">$1,247</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Device Efficiency */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Device Efficiency Analysis</h3>
          <Button variant="ghost" icon={Settings} size="sm">
            Optimize All
          </Button>
        </div>
        <div className="space-y-4">
          {deviceEfficiencyData.map((device, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#263340] rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium">{device.device}</h4>
                <div className="flex items-center space-x-4">
                  <span className="text-[#B8C2CC] text-sm">{device.consumption}% of total</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    device.efficiency >= 90 ? 'text-[#2AFFB2] bg-[#2AFFB2]/10' :
                    device.efficiency >= 80 ? 'text-[#00FF9D] bg-[#00FF9D]/10' :
                    device.efficiency >= 70 ? 'text-[#FFD166] bg-[#FFD166]/10' :
                    'text-[#FF4D4D] bg-[#FF4D4D]/10'
                  }`}>
                    {device.efficiency}% efficient
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#B8C2CC] text-sm">Efficiency</span>
                    <span className="text-white text-sm">{device.efficiency}%</span>
                  </div>
                  <div className="w-full bg-[#1A232E] rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${device.efficiency}%`,
                        backgroundColor: getEfficiencyColor(device.efficiency)
                      }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#00FF9D] font-semibold">{device.potential}%</p>
                  <p className="text-[#B8C2CC] text-xs">potential savings</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Monthly Trends & Carbon Footprint */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Monthly Trends</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrendsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#263340" />
              <XAxis dataKey="month" stroke="#B8C2CC" />
              <YAxis stroke="#B8C2CC" />
              <Line 
                type="monotone" 
                dataKey="consumption" 
                stroke="#FF4D4D" 
                strokeWidth={3}
                dot={{ fill: '#FF4D4D', strokeWidth: 2, r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="cost" 
                stroke="#FFD166" 
                strokeWidth={3}
                dot={{ fill: '#FFD166', strokeWidth: 2, r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="savings" 
                stroke="#00FF9D" 
                strokeWidth={3}
                dot={{ fill: '#00FF9D', strokeWidth: 2, r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Carbon Footprint */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Carbon Footprint</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={carbonFootprintData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#263340" />
              <XAxis dataKey="month" stroke="#B8C2CC" />
              <YAxis stroke="#B8C2CC" />
              <Area 
                type="monotone" 
                dataKey="emissions" 
                stackId="1"
                stroke="#FF4D4D" 
                fill="#FF4D4D" 
                fillOpacity={0.3}
              />
              <Area 
                type="monotone" 
                dataKey="offset" 
                stackId="2"
                stroke="#00FF9D" 
                fill="#00FF9D" 
                fillOpacity={0.3}
              />
              <Area 
                type="monotone" 
                dataKey="net" 
                stackId="3"
                stroke="#FFD166" 
                fill="#FFD166" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-[#263340] rounded-lg">
              <p className="text-[#FF4D4D] font-semibold">10.9 tons</p>
              <p className="text-[#B8C2CC] text-xs">Emissions</p>
            </div>
            <div className="text-center p-3 bg-[#263340] rounded-lg">
              <p className="text-[#00FF9D] font-semibold">10.8 tons</p>
              <p className="text-[#B8C2CC] text-xs">Offset</p>
            </div>
            <div className="text-center p-3 bg-[#263340] rounded-lg">
              <p className="text-[#FFD166] font-semibold">0.1 tons</p>
              <p className="text-[#B8C2CC] text-xs">Net Impact</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};