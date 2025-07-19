import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Calendar,
  Filter,
  Download,
  Plus,
  Settings,
  Activity,
  Zap
} from 'lucide-react';
import { Card, StatCard } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';

const maintenanceData = [
  { month: 'Jan', scheduled: 45, emergency: 12, completed: 52 },
  { month: 'Feb', scheduled: 52, emergency: 8, completed: 58 },
  { month: 'Mar', scheduled: 48, emergency: 15, completed: 55 },
  { month: 'Apr', scheduled: 61, emergency: 6, completed: 63 },
  { month: 'May', scheduled: 55, emergency: 11, completed: 60 },
  { month: 'Jun', scheduled: 67, emergency: 4, completed: 68 }
];

const predictiveData = [
  { device: 'Pump A-1', health: 85, prediction: 'Good', daysToMaintenance: 45 },
  { device: 'Motor B-3', health: 65, prediction: 'Warning', daysToMaintenance: 12 },
  { device: 'Sensor C-7', health: 92, prediction: 'Excellent', daysToMaintenance: 78 },
  { device: 'Valve D-2', health: 45, prediction: 'Critical', daysToMaintenance: 3 },
  { device: 'Compressor E-1', health: 78, prediction: 'Good', daysToMaintenance: 28 }
];

const failurePredictionData = [
  { name: 'Mechanical', value: 35, color: '#FF4D4D' },
  { name: 'Electrical', value: 25, color: '#FFD166' },
  { name: 'Software', value: 20, color: '#00E0FF' },
  { name: 'Environmental', value: 15, color: '#00FF9D' },
  { name: 'Other', value: 5, color: '#B8C2CC' }
];

const costSavingsData = [
  { month: 'Jan', preventive: 15000, reactive: 45000, savings: 30000 },
  { month: 'Feb', preventive: 18000, reactive: 38000, savings: 20000 },
  { month: 'Mar', preventive: 16000, reactive: 42000, savings: 26000 },
  { month: 'Apr', preventive: 20000, reactive: 35000, savings: 15000 },
  { month: 'May', preventive: 17000, reactive: 40000, savings: 23000 },
  { month: 'Jun', preventive: 19000, reactive: 32000, savings: 13000 }
];

interface MaintenanceTask {
  id: string;
  device: string;
  type: 'scheduled' | 'emergency' | 'predictive';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  assignee: string;
  dueDate: Date;
  description: string;
  estimatedHours: number;
}

const mockTasks: MaintenanceTask[] = [
  {
    id: 'TASK-001',
    device: 'Pump Unit A-1',
    type: 'predictive',
    priority: 'critical',
    status: 'pending',
    assignee: 'John Smith',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    description: 'Replace worn bearings based on vibration analysis',
    estimatedHours: 4
  },
  {
    id: 'TASK-002',
    device: 'Motor B-3',
    type: 'scheduled',
    priority: 'medium',
    status: 'in_progress',
    assignee: 'Sarah Johnson',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    description: 'Quarterly lubrication and inspection',
    estimatedHours: 2
  },
  {
    id: 'TASK-003',
    device: 'Sensor Array C-7',
    type: 'emergency',
    priority: 'high',
    status: 'completed',
    assignee: 'Mike Wilson',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    description: 'Replace faulty temperature sensor',
    estimatedHours: 1.5
  }
];

export const Maintenance: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-[#FF4D4D] bg-[#FF4D4D]/10';
      case 'high': return 'text-[#FFD166] bg-[#FFD166]/10';
      case 'medium': return 'text-[#00E0FF] bg-[#00E0FF]/10';
      case 'low': return 'text-[#2AFFB2] bg-[#2AFFB2]/10';
      default: return 'text-[#B8C2CC] bg-[#B8C2CC]/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-[#2AFFB2] bg-[#2AFFB2]/10';
      case 'in_progress': return 'text-[#00E0FF] bg-[#00E0FF]/10';
      case 'overdue': return 'text-[#FF4D4D] bg-[#FF4D4D]/10';
      case 'pending': return 'text-[#FFD166] bg-[#FFD166]/10';
      default: return 'text-[#B8C2CC] bg-[#B8C2CC]/10';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 80) return '#2AFFB2';
    if (health >= 60) return '#FFD166';
    return '#FF4D4D';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Predictive Maintenance</h1>
          <p className="text-[#B8C2CC] mt-1">AI-powered maintenance scheduling and health monitoring</p>
        </div>
        <div className="mt-4 lg:mt-0 flex items-center space-x-3">
          <Button variant="ghost" icon={Download}>
            Export Report
          </Button>
          <Button variant="primary" icon={Plus}>
            Schedule Maintenance
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Tasks"
          value="23"
          change="+3 from yesterday"
          changeType="neutral"
          icon={<Wrench className="w-6 h-6" />}
        />
        <StatCard
          title="Critical Alerts"
          value="2"
          change="-1 from last week"
          changeType="positive"
          icon={<AlertTriangle className="w-6 h-6" />}
        />
        <StatCard
          title="Completion Rate"
          value="94.2%"
          change="+2.1% this month"
          changeType="positive"
          icon={<CheckCircle className="w-6 h-6" />}
        />
        <StatCard
          title="Cost Savings"
          value="$127K"
          change="+15% vs reactive"
          changeType="positive"
          icon={<TrendingUp className="w-6 h-6" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Maintenance Trends */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Maintenance Trends</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#00FF9D] rounded-full"></div>
                <span className="text-[#B8C2CC]">Scheduled</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#FF4D4D] rounded-full"></div>
                <span className="text-[#B8C2CC]">Emergency</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#00E0FF] rounded-full"></div>
                <span className="text-[#B8C2CC]">Completed</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={maintenanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#263340" />
              <XAxis dataKey="month" stroke="#B8C2CC" />
              <YAxis stroke="#B8C2CC" />
              <Bar dataKey="scheduled" fill="#00FF9D" radius={[2, 2, 0, 0]} />
              <Bar dataKey="emergency" fill="#FF4D4D" radius={[2, 2, 0, 0]} />
              <Bar dataKey="completed" fill="#00E0FF" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Failure Prediction */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Failure Prediction Analysis</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={failurePredictionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {failurePredictionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {failurePredictionData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-[#B8C2CC] text-sm">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Device Health Monitoring */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Device Health Monitoring</h3>
          <Button variant="ghost" icon={Settings} size="sm">
            Configure Thresholds
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {predictiveData.map((device, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#263340] rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium text-sm">{device.device}</h4>
                <Activity className="w-4 h-4 text-[#00FF9D]" />
              </div>
              
              <div className="relative w-16 h-16 mx-auto mb-3">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#1A232E"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke={getHealthColor(device.health)}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - device.health / 100)}`}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{device.health}%</span>
                </div>
              </div>

              <div className="text-center">
                <p className={`text-xs font-medium px-2 py-1 rounded-full ${
                  device.prediction === 'Excellent' ? 'text-[#2AFFB2] bg-[#2AFFB2]/10' :
                  device.prediction === 'Good' ? 'text-[#00FF9D] bg-[#00FF9D]/10' :
                  device.prediction === 'Warning' ? 'text-[#FFD166] bg-[#FFD166]/10' :
                  'text-[#FF4D4D] bg-[#FF4D4D]/10'
                }`}>
                  {device.prediction}
                </p>
                <p className="text-[#B8C2CC] text-xs mt-2">
                  Next maintenance: {device.daysToMaintenance} days
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Cost Analysis */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Cost Analysis & Savings</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#00FF9D] rounded-full"></div>
              <span className="text-[#B8C2CC]">Preventive</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#FF4D4D] rounded-full"></div>
              <span className="text-[#B8C2CC]">Reactive</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#FFD166] rounded-full"></div>
              <span className="text-[#B8C2CC]">Savings</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={costSavingsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#263340" />
            <XAxis dataKey="month" stroke="#B8C2CC" />
            <YAxis stroke="#B8C2CC" />
            <Line 
              type="monotone" 
              dataKey="preventive" 
              stroke="#00FF9D" 
              strokeWidth={3}
              dot={{ fill: '#00FF9D', strokeWidth: 2, r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="reactive" 
              stroke="#FF4D4D" 
              strokeWidth={3}
              dot={{ fill: '#FF4D4D', strokeWidth: 2, r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="savings" 
              stroke="#FFD166" 
              strokeWidth={3}
              dot={{ fill: '#FFD166', strokeWidth: 2, r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Maintenance Tasks */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Active Maintenance Tasks</h3>
          <div className="flex items-center space-x-3">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="bg-[#263340] border border-[#263340] rounded-lg px-3 py-2 text-[#E0E0E0] text-sm focus:outline-none focus:ring-2 focus:ring-[#00FF9D]"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="overdue">Overdue</option>
            </select>
            <Button variant="ghost" icon={Filter} size="sm">
              Filter
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {mockTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#263340] rounded-lg p-4 hover:bg-[#2A3A47] transition-colors cursor-pointer"
              onClick={() => setSelectedTask(task)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-white font-medium">{task.device}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-[#B8C2CC] text-sm mb-2">{task.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-[#B8C2CC]">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Due: {task.dueDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{task.estimatedHours}h estimated</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>Assigned to: {task.assignee}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {task.type === 'predictive' && <Zap className="w-4 h-4 text-[#00FF9D]" />}
                  {task.type === 'emergency' && <AlertTriangle className="w-4 h-4 text-[#FF4D4D]" />}
                  {task.type === 'scheduled' && <Calendar className="w-4 h-4 text-[#00E0FF]" />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};