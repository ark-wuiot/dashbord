import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Key,
  Database,
  Wifi,
  Palette,
  Globe,
  Download,
  Upload,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Check,
  X,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const settingsSections: SettingsSection[] = [
  {
    id: 'general',
    title: 'General Settings',
    icon: <SettingsIcon className="w-5 h-5" />,
    description: 'Basic platform configuration and preferences'
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: <Bell className="w-5 h-5" />,
    description: 'Configure alerts and notification preferences'
  },
  {
    id: 'security',
    title: 'Security & Privacy',
    icon: <Shield className="w-5 h-5" />,
    description: 'Security settings and access controls'
  },
  {
    id: 'api',
    title: 'API Management',
    icon: <Key className="w-5 h-5" />,
    description: 'API keys, webhooks, and integrations'
  },
  {
    id: 'database',
    title: 'Database',
    icon: <Database className="w-5 h-5" />,
    description: 'Database configuration and backup settings'
  },
  {
    id: 'network',
    title: 'Network',
    icon: <Wifi className="w-5 h-5" />,
    description: 'Network protocols and connectivity settings'
  },
  {
    id: 'appearance',
    title: 'Appearance',
    icon: <Palette className="w-5 h-5" />,
    description: 'Theme, layout, and display preferences'
  },
  {
    id: 'localization',
    title: 'Localization',
    icon: <Globe className="w-5 h-5" />,
    description: 'Language, timezone, and regional settings'
  }
];

export const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [showApiKey, setShowApiKey] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    anomalies: true,
    maintenance: true,
    security: true
  });

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Platform Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Platform Name"
            defaultValue="Ark-Wuiot Platform"
            placeholder="Enter platform name"
          />
          <Input
            label="Organization"
            defaultValue="Ark Technologies"
            placeholder="Enter organization name"
          />
          <Input
            label="Contact Email"
            type="email"
            defaultValue="admin@arkwuiot.com"
            placeholder="Enter contact email"
          />
          <Input
            label="Support Phone"
            defaultValue="+1 (555) 123-4567"
            placeholder="Enter support phone"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">System Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#263340] rounded-lg">
            <div>
              <p className="text-white font-medium">Auto-save Settings</p>
              <p className="text-[#B8C2CC] text-sm">Automatically save configuration changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-[#1A232E] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FF9D]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#263340] rounded-lg">
            <div>
              <p className="text-white font-medium">Debug Mode</p>
              <p className="text-[#B8C2CC] text-sm">Enable detailed logging for troubleshooting</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-[#1A232E] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FF9D]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#263340] rounded-lg">
            <div>
              <p className="text-white font-medium">Maintenance Mode</p>
              <p className="text-[#B8C2CC] text-sm">Put platform in maintenance mode</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-[#1A232E] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FF9D]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Notification Channels</h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-[#263340] rounded-lg">
              <div>
                <p className="text-white font-medium capitalize">{key.replace('_', ' ')} Notifications</p>
                <p className="text-[#B8C2CC] text-sm">
                  {key === 'email' && 'Receive notifications via email'}
                  {key === 'push' && 'Browser push notifications'}
                  {key === 'sms' && 'SMS text message alerts'}
                  {key === 'anomalies' && 'Anomaly detection alerts'}
                  {key === 'maintenance' && 'Maintenance reminders'}
                  {key === 'security' && 'Security event notifications'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={value}
                  onChange={() => setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                />
                <div className="w-11 h-6 bg-[#1A232E] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FF9D]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Alert Thresholds</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Temperature Alert (°C)"
            type="number"
            defaultValue="75"
            placeholder="Enter temperature threshold"
          />
          <Input
            label="Vibration Alert (Hz)"
            type="number"
            defaultValue="100"
            placeholder="Enter vibration threshold"
          />
          <Input
            label="Energy Usage Alert (%)"
            type="number"
            defaultValue="85"
            placeholder="Enter usage threshold"
          />
          <Input
            label="Network Latency (ms)"
            type="number"
            defaultValue="50"
            placeholder="Enter latency threshold"
          />
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Authentication</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#263340] rounded-lg">
            <div>
              <p className="text-white font-medium">Two-Factor Authentication</p>
              <p className="text-[#B8C2CC] text-sm">Add an extra layer of security to your account</p>
            </div>
            <Button variant="primary" size="sm">
              Enable 2FA
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#263340] rounded-lg">
            <div>
              <p className="text-white font-medium">Session Timeout</p>
              <p className="text-[#B8C2CC] text-sm">Automatically log out inactive users</p>
            </div>
            <select className="bg-[#1A232E] border border-[#1A232E] rounded-lg px-3 py-2 text-[#E0E0E0] text-sm focus:outline-none focus:ring-2 focus:ring-[#00FF9D]">
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="480">8 hours</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#263340] rounded-lg">
            <div>
              <p className="text-white font-medium">Password Policy</p>
              <p className="text-[#B8C2CC] text-sm">Enforce strong password requirements</p>
            </div>
            <Button variant="ghost" size="sm">
              Configure
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Access Control</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#263340] rounded-lg">
            <div>
              <p className="text-white font-medium">IP Whitelist</p>
              <p className="text-[#B8C2CC] text-sm">Restrict access to specific IP addresses</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-[#1A232E] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FF9D]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#263340] rounded-lg">
            <div>
              <p className="text-white font-medium">Audit Logging</p>
              <p className="text-[#B8C2CC] text-sm">Log all user actions and system events</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-[#1A232E] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FF9D]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApiSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">API Keys</h3>
        <div className="space-y-4">
          <div className="p-4 bg-[#263340] rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-white font-medium">Production API Key</p>
                <p className="text-[#B8C2CC] text-sm">Full access to production environment</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" icon={RefreshCw}>
                  Regenerate
                </Button>
                <Button variant="ghost" size="sm" icon={showApiKey ? EyeOff : Eye} onClick={() => setShowApiKey(!showApiKey)}>
                  {showApiKey ? 'Hide' : 'Show'}
                </Button>
              </div>
            </div>
            <div className="bg-[#1A232E] rounded-lg p-3 font-mono text-sm">
              <span className="text-[#00FF9D]">
                {showApiKey ? 'ark_prod_1234567890abcdef1234567890abcdef' : '••••••••••••••••••••••••••••••••'}
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#263340] rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-white font-medium">Development API Key</p>
                <p className="text-[#B8C2CC] text-sm">Limited access for testing and development</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" icon={RefreshCw}>
                  Regenerate
                </Button>
                <Button variant="ghost" size="sm" icon={Eye}>
                  Show
                </Button>
              </div>
            </div>
            <div className="bg-[#1A232E] rounded-lg p-3 font-mono text-sm">
              <span className="text-[#00E0FF]">
                ••••••••••••••••••••••••••••••••
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Webhooks</h3>
        <div className="space-y-4">
          <div className="p-4 bg-[#263340] rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-white font-medium">Device Status Webhook</p>
                <p className="text-[#B8C2CC] text-sm">https://api.example.com/webhooks/device-status</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-[#2AFFB2]/10 text-[#2AFFB2] rounded-full text-xs">Active</span>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#263340] rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-white font-medium">Anomaly Alert Webhook</p>
                <p className="text-[#B8C2CC] text-sm">https://api.example.com/webhooks/anomalies</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-[#FFD166]/10 text-[#FFD166] rounded-full text-xs">Inactive</span>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </div>

          <Button variant="primary" icon={Key}>
            Add New Webhook
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Rate Limiting</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Requests per minute"
            type="number"
            defaultValue="1000"
            placeholder="Enter rate limit"
          />
          <Input
            label="Burst limit"
            type="number"
            defaultValue="100"
            placeholder="Enter burst limit"
          />
        </div>
      </div>
    </div>
  );

  const renderDatabaseSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Database Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Database Host"
            defaultValue="localhost"
            placeholder="Enter database host"
          />
          <Input
            label="Database Port"
            type="number"
            defaultValue="5432"
            placeholder="Enter database port"
          />
          <Input
            label="Database Name"
            defaultValue="arkwuiot_prod"
            placeholder="Enter database name"
          />
          <Input
            label="Connection Pool Size"
            type="number"
            defaultValue="20"
            placeholder="Enter pool size"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Backup Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#263340] rounded-lg">
            <div>
              <p className="text-white font-medium">Automatic Backups</p>
              <p className="text-[#B8C2CC] text-sm">Schedule regular database backups</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-[#1A232E] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FF9D]"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#E0E0E0] mb-2">Backup Frequency</label>
              <select className="w-full bg-[#263340] border border-[#263340] rounded-lg px-4 py-3 text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#00FF9D]">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#E0E0E0] mb-2">Retention Period</label>
              <select className="w-full bg-[#263340] border border-[#263340] rounded-lg px-4 py-3 text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#00FF9D]">
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="365">1 year</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="primary" icon={Download}>
              Create Backup Now
            </Button>
            <Button variant="ghost" icon={Upload}>
              Restore from Backup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Theme Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#263340] rounded-lg">
            <div>
              <p className="text-white font-medium">Dark Mode</p>
              <p className="text-[#B8C2CC] text-sm">Use dark theme for better visibility in low light</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="w-11 h-6 bg-[#1A232E] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FF9D]"></div>
            </label>
          </div>

          <div className="p-4 bg-[#263340] rounded-lg">
            <p className="text-white font-medium mb-3">Accent Color</p>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-[#00FF9D] rounded-full border-2 border-white cursor-pointer"></div>
              <div className="w-8 h-8 bg-[#00E0FF] rounded-full border-2 border-transparent cursor-pointer"></div>
              <div className="w-8 h-8 bg-[#FFD166] rounded-full border-2 border-transparent cursor-pointer"></div>
              <div className="w-8 h-8 bg-[#FF4D4D] rounded-full border-2 border-transparent cursor-pointer"></div>
              <div className="w-8 h-8 bg-[#2AFFB2] rounded-full border-2 border-transparent cursor-pointer"></div>
            </div>
          </div>

          <div className="p-4 bg-[#263340] rounded-lg">
            <p className="text-white font-medium mb-3">Sidebar Behavior</p>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input type="radio" name="sidebar" className="text-[#00FF9D]" defaultChecked />
                <span className="text-[#E0E0E0]">Auto-collapse on mobile</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="sidebar" className="text-[#00FF9D]" />
                <span className="text-[#E0E0E0]">Always expanded</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="sidebar" className="text-[#00FF9D]" />
                <span className="text-[#E0E0E0]">Always collapsed</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'general': return renderGeneralSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
      case 'api': return renderApiSettings();
      case 'database': return renderDatabaseSettings();
      case 'appearance': return renderAppearanceSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Platform Settings</h1>
          <p className="text-[#B8C2CC] mt-1">Configure platform preferences and system settings</p>
        </div>
        <div className="mt-4 lg:mt-0 flex items-center space-x-3">
          <Button variant="ghost" icon={RefreshCw}>
            Reset to Defaults
          </Button>
          <Button variant="primary" icon={Save}>
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <Card className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4">Settings</h3>
          <nav className="space-y-2">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-[#00FF9D]/10 text-[#00FF9D] border border-[#00FF9D]/20'
                    : 'text-[#B8C2CC] hover:text-white hover:bg-[#263340]'
                }`}
              >
                {section.icon}
                <span className="font-medium">{section.title}</span>
              </button>
            ))}
          </nav>
        </Card>

        {/* Settings Content */}
        <Card className="lg:col-span-3">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white">
              {settingsSections.find(s => s.id === activeSection)?.title}
            </h3>
            <p className="text-[#B8C2CC] mt-1">
              {settingsSections.find(s => s.id === activeSection)?.description}
            </p>
          </div>

          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>

          {/* Save Actions */}
          <div className="mt-8 pt-6 border-t border-[#263340] flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-[#B8C2CC]">
              <Info className="w-4 h-4" />
              <span>Changes are automatically saved</span>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost">
                Cancel
              </Button>
              <Button variant="primary" icon={Save}>
                Save Changes
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};