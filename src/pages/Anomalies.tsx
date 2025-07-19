import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  Brain, 
  TrendingUp,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  Target,
  Filter,
  Download,
  Settings,
  Play,
  Pause
} from 'lucide-react';
import { Card, StatCard } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter } from 'recharts';

const anomalyDetectionData = [
  { time: '00:00', anomalies: 2, confidence: 85, severity: 'low' },
  { time: '04:00', anomalies: 1, confidence: 92, severity: 'low' },
  { time: '08:00', anomalies: 5, confidence: 78, severity: 'medium' },
  { time: '12:00', anomalies: 8, confidence: 88, severity: 'high' },
  { time: '16:00', anomalies: 12, confidence: 95, severity: 'critical' },
  { time: '20:00', anomalies: 6, confidence: 82, severity: 'medium' },
  { time: '24:00', anomalies: 3, confidence: 89, severity: 'low' }
];

const aiModelPerformanceData = [
  { model: 'Temperature Anomaly', accuracy: 94.2, precision: 91.8, recall: 96.5, f1Score: 94.1 },
  { model: 'Vibration Pattern', accuracy: 89.7, precision: 87.3, recall: 92.1, f1Score: 89.6 },
  { model: 'Energy Consumption', accuracy: 92.5, precision: 90.2, recall: 94.8, f1Score: 92.4 },
  { model: 'Network Traffic', accuracy: 87.9, precision: 85.6, recall: 90.3, f1Score: 87.9 },
  { model: 'Pressure Variance', accuracy: 91.3, precision: 88.9, recall: 93.7, f1Score: 91.2 }
];

const anomalyTypesData = [
  { type: 'Temperature', count: 45, resolved: 38, pending: 7 },
  { type: 'Vibration', count: 32, resolved: 28, pending: 4 },
  { type: 'Pressure', count: 28, resolved: 25, pending: 3 },
  { type: 'Energy', count: 23, resolved: 20, pending: 3 },
  { type: 'Network', count: 18, resolved: 15, pending: 3 }
];

const predictionAccuracyData = [
  { week: 'Week 1', predicted: 45, actual: 42, accuracy: 93.3 },
  { week: 'Week 2', predicted: 38, actual: 41, accuracy: 92.7 },
  { week: 'Week 3', predicted: 52, actual: 48, accuracy: 92.3 },
  { week: 'Week 4', predicted: 41, actual: 39, accuracy: 95.1 }
];

interface Anomaly {
  id: string;
  type: 'temperature' | 'vibration' | 'pressure' | 'energy' | 'network';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'detected' | 'investigating' | 'resolved' | 'false_positive';
  device: string;
  description: string;
  confidence: number;
  timestamp: Date;
  aiSuggestion: string;
  impact: string;
}

const mockAnomalies: Anomaly[] = [
  {
    id: 'ANO-001',
    type: 'temperature',
    severity: 'critical',
    status: 'detected',
    device: 'Sensor-247',
    description: 'Temperature spike detected - 15°C above normal operating range',
    confidence: 96.8,
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    aiSuggestion: 'Check cooling system and verify sensor calibration',
    impact: 'Potential equipment damage if not addressed within 30 minutes'
  },
  {
    id: 'ANO-002',
    type: 'vibration',
    severity: 'high',
    status: 'investigating',
    device: 'Motor-B3',
    description: 'Unusual vibration pattern indicating bearing wear',
    confidence: 89.2,
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    aiSuggestion: 'Schedule maintenance for bearing replacement within 48 hours',
    impact: 'Motor failure risk increased by 340%'
  },
  {
    id: 'ANO-003',
    type: 'energy',
    severity: 'medium',
    status: 'resolved',
    device: 'HVAC-Unit-12',
    description: 'Energy consumption 25% higher than baseline',
    confidence: 84.5,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    aiSuggestion: 'Filter replacement resolved the efficiency issue',
    impact: 'Additional $45/day in energy costs'
  }
];

export const Anomalies: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [aiModelEnabled, setAiModelEnabled] = useState(true);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-[#FF4D4D] bg-[#FF4D4D]/10';
      case 'high': return 'text-[#FFD166] bg-[#FFD166]/10';
      case 'medium': return 'text-[#00E0FF] bg-[#00E0FF]/10';
      case 'low': return 'text-[#2AFFB2] bg-[#2AFFB2]/10';
      default: return 'text-[#B8C2CC] bg-[#B8C2CC]/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'text-[#2AFFB2] bg-[#2AFFB2]/10';
      case 'investigating': return 'text-[#00E0FF] bg-[#00E0FF]/10';
      case 'detected': return 'text-[#FFD166] bg-[#FFD166]/10';
      case 'false_positive': return 'text-[#B8C2CC] bg-[#B8C2CC]/10';
      default: return 'text-[#B8C2CC] bg-[#B8C2CC]/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'temperature': return <TrendingUp className="w-4 h-4" />;
      case 'vibration': return <Target className="w-4 h-4" />;
      case 'pressure': return <Zap className="w-4 h-4" />;
      case 'energy': return <Zap className="w-4 h-4" />;
      case 'network': return <Shield className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Anomaly Detection</h1>
          <p className="text-[#B8C2CC] mt-1">Machine learning-powered anomaly detection and predictive insights</p>
        </div>
        <div className="mt-4 lg:mt-0 flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-[#00FF9D]/10 border border-[#00FF9D]/20 rounded-lg px-3 py-2">
            <Brain className="w-4 h-4 text-[#00FF9D]" />
            <span className="text-[#00FF9D] text-sm font-medium">AI Active</span>
            <button
              onClick={() => setAiModelEnabled(!aiModelEnabled)}
              className="ml-2"
            >
              {aiModelEnabled ? <Pause className="w-3 h-3 text-[#00FF9D]" /> : <Play className="w-3 h-3 text-[#00FF9D]" />}
            </button>
          </div>
          <Button variant="ghost" icon={Download}>
            Export Report
          </Button>
          <Button variant="primary" icon={Settings}>
            Configure Models
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Anomalies"
          value="17"
          change="-5 from yesterday"
          changeType="positive"
          icon={<AlertTriangle className="w-6 h-6" />}
        />
        <StatCard
          title="Detection Accuracy"
          value="94.2%"
          change="+1.8% this week"
          changeType="positive"
          icon={<Target className="w-6 h-6" />}
        />
        <StatCard
          title="False Positives"
          value="2.1%"
          change="-0.5% improvement"
          changeType="positive"
          icon={<CheckCircle className="w-6 h-6" />}
        />
        <StatCard
          title="Prevented Failures"
          value="23"
          change="+8 this month"
          changeType="positive"
          icon={<Shield className="w-6 h-6" />}
        />
      </div>

      {/* AI Model Performance */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">AI Model Performance</h3>
          <Button variant="ghost" icon={Brain} size="sm">
            Retrain Models
          </Button>
        </div>
        <div className="space-y-4">
          {aiModelPerformanceData.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#263340] rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-medium">{model.model}</h4>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-[#B8C2CC]">Accuracy: </span>
                  <span className="text-[#00FF9D] font-semibold">{model.accuracy}%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="relative w-16 h-16 mx-auto mb-2">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#1A232E" strokeWidth="4" fill="none" />
                      <circle
                        cx="32" cy="32" r="28" stroke="#00FF9D" strokeWidth="4" fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - model.accuracy / 100)}`}
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">{model.accuracy}%</span>
                    </div>
                  </div>
                  <p className="text-[#B8C2CC] text-xs">Accuracy</p>
                </div>
                
                <div className="text-center">
                  <div className="relative w-16 h-16 mx-auto mb-2">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#1A232E" strokeWidth="4" fill="none" />
                      <circle
                        cx="32" cy="32" r="28" stroke="#00E0FF" strokeWidth="4" fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - model.precision / 100)}`}
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">{model.precision}%</span>
                    </div>
                  </div>
                  <p className="text-[#B8C2CC] text-xs">Precision</p>
                </div>
                
                <div className="text-center">
                  <div className="relative w-16 h-16 mx-auto mb-2">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#1A232E" strokeWidth="4" fill="none" />
                      <circle
                        cx="32" cy="32" r="28" stroke="#FFD166" strokeWidth="4" fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - model.recall / 100)}`}
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">{model.recall}%</span>
                    </div>
                  </div>
                  <p className="text-[#B8C2CC] text-xs">Recall</p>
                </div>
                
                <div className="text-center">
                  <div className="relative w-16 h-16 mx-auto mb-2">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#1A232E" strokeWidth="4" fill="none" />
                      <circle
                        cx="32" cy="32" r="28" stroke="#2AFFB2" strokeWidth="4" fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - model.f1Score / 100)}`}
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">{model.f1Score}%</span>
                    </div>
                  </div>
                  <p className="text-[#B8C2CC] text-xs">F1 Score</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Detection Trends & Anomaly Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detection Trends */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Detection Trends</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#FF4D4D] rounded-full"></div>
                <span className="text-[#B8C2CC]">Anomalies</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#00FF9D] rounded-full"></div>
                <span className="text-[#B8C2CC]">Confidence</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={anomalyDetectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#263340" />
              <XAxis dataKey="time" stroke="#B8C2CC" />
              <YAxis stroke="#B8C2CC" />
              <Line 
                type="monotone" 
                dataKey="anomalies" 
                stroke="#FF4D4D" 
                strokeWidth={3}
                dot={{ fill: '#FF4D4D', strokeWidth: 2, r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="confidence" 
                stroke="#00FF9D" 
                strokeWidth={3}
                dot={{ fill: '#00FF9D', strokeWidth: 2, r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Anomaly Types */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Anomaly Types</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={anomalyTypesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#263340" />
              <XAxis dataKey="type" stroke="#B8C2CC" />
              <YAxis stroke="#B8C2CC" />
              <Bar dataKey="resolved" fill="#00FF9D" radius={[2, 2, 0, 0]} />
              <Bar dataKey="pending" fill="#FFD166" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#00FF9D] rounded-full"></div>
              <span className="text-[#B8C2CC]">Resolved</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#FFD166] rounded-full"></div>
              <span className="text-[#B8C2CC]">Pending</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Prediction Accuracy */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Prediction Accuracy Trends</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={predictionAccuracyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#263340" />
            <XAxis dataKey="week" stroke="#B8C2CC" />
            <YAxis stroke="#B8C2CC" />
            <Area 
              type="monotone" 
              dataKey="predicted" 
              stackId="1"
              stroke="#00E0FF" 
              fill="#00E0FF" 
              fillOpacity={0.3}
            />
            <Area 
              type="monotone" 
              dataKey="actual" 
              stackId="2"
              stroke="#00FF9D" 
              fill="#00FF9D" 
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-4 gap-4">
          {predictionAccuracyData.map((week, index) => (
            <div key={index} className="text-center p-3 bg-[#263340] rounded-lg">
              <p className="text-white font-semibold">{week.accuracy}%</p>
              <p className="text-[#B8C2CC] text-xs">{week.week}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Active Anomalies */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Active Anomalies</h3>
          <div className="flex items-center space-x-3">
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="bg-[#263340] border border-[#263340] rounded-lg px-3 py-2 text-[#E0E0E0] text-sm focus:outline-none focus:ring-2 focus:ring-[#00FF9D]"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <Button variant="ghost" icon={Filter} size="sm">
              Filter
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {mockAnomalies.map((anomaly, index) => (
            <motion.div
              key={anomaly.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#263340] rounded-lg p-6 hover:bg-[#2A3A47] transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    {getTypeIcon(anomaly.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-white font-semibold">{anomaly.device}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(anomaly.severity)}`}>
                        {anomaly.severity}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(anomaly.status)}`}>
                        {anomaly.status.replace('_', ' ')}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Brain className="w-3 h-3 text-[#00FF9D]" />
                        <span className="text-[#00FF9D] text-xs font-medium">{anomaly.confidence}% confidence</span>
                      </div>
                    </div>
                    <p className="text-[#E0E0E0] mb-3">{anomaly.description}</p>
                    <div className="bg-[#1A232E] rounded-lg p-3 mb-3">
                      <div className="flex items-start space-x-2">
                        <Brain className="w-4 h-4 text-[#00FF9D] mt-0.5" />
                        <div>
                          <p className="text-[#00FF9D] text-sm font-medium">AI Suggestion:</p>
                          <p className="text-[#B8C2CC] text-sm">{anomaly.aiSuggestion}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-[#B8C2CC]">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{anomaly.timestamp.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Impact: {anomaly.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" icon={Eye}>
                    Investigate
                  </Button>
                  <Button variant="ghost" size="sm" icon={CheckCircle}>
                    Resolve
                  </Button>
                  <Button variant="ghost" size="sm" icon={XCircle}>
                    False Positive
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