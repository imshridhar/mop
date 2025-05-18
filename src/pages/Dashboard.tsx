import React from 'react';
import { BarChart3, Boxes, ClipboardList, Clock, Settings, TrendingUp, AlertTriangle } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import ProductionStatus from '../components/dashboard/ProductionStatus';
import RecentAlerts from '../components/dashboard/RecentAlerts';
import ProductionProgress from '../components/dashboard/ProductionProgress';
import KpiSummary from '../components/dashboard/KpiSummary';

const Dashboard = () => {
  const productionData = {
    target: 500,
    current: 342,
    percentComplete: 68.4,
    timeRemaining: '3h 45m',
  };

  const kpiData = [
    { name: 'OEE', value: '76%', change: '+2.3%', trend: 'up' },
    { name: 'Efficiency', value: '82%', change: '+1.5%', trend: 'up' },
    { name: 'Downtime', value: '8.2h', change: '-1.2h', trend: 'down' },
    { name: 'Quality', value: '98.5%', change: '+0.3%', trend: 'up' },
  ];

  const alerts = [
    { id: 1, level: 'warning', message: 'Low inventory: Aluminum sheets', time: '15 min ago' },
    { id: 2, level: 'error', message: 'Machine M104 downtime exceeds threshold', time: '32 min ago' },
    { id: 3, level: 'info', message: 'Work order #4872 completed', time: '1 hour ago' },
    { id: 4, level: 'warning', message: 'Maintenance due: Hydraulic Press', time: '3 hours ago' },
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Production Dashboard</h1>
        <div className="flex items-center mt-3 md:mt-0">
          <select className="mr-2 p-2 bg-white border border-gray-300 rounded-md text-sm">
            <option>Today</option>
            <option>Yesterday</option>
            <option>Last 7 Days</option>
            <option>This Month</option>
          </select>
          <button className="p-2 bg-indigo-50 rounded-md">
            <Settings size={18} className="text-indigo-600" />
          </button>
        </div>
      </div>

      <KpiSummary kpis={kpiData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DashboardCard title="Current Production" icon={<BarChart3 className="text-indigo-600" />}>
          <ProductionStatus data={productionData} />
        </DashboardCard>
        <DashboardCard title="Recent Alerts" icon={<AlertTriangle className="text-amber-500" />}>
          <RecentAlerts alerts={alerts} />
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <DashboardCard title="Work Orders" icon={<ClipboardList className="text-indigo-600" />}>
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Active Orders</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Pending Approval</span>
              <span className="font-semibold">4</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Completed Today</span>
              <span className="font-semibold">7</span>
            </div>
            <div className="mt-4">
              <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                View All Work Orders →
              </button>
            </div>
          </div>
        </DashboardCard>
        <DashboardCard title="Inventory Status" icon={<Boxes className="text-indigo-600" />}>
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Low Stock Items</span>
              <span className="font-semibold text-amber-600">8</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Out of Stock</span>
              <span className="font-semibold text-red-600">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Total Items</span>
              <span className="font-semibold">246</span>
            </div>
            <div className="mt-4">
              <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                View Inventory →
              </button>
            </div>
          </div>
        </DashboardCard>
        <DashboardCard title="Production Hours" icon={<Clock className="text-indigo-600" />}>
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Today</span>
              <span className="font-semibold">8.5 hrs</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">This Week</span>
              <span className="font-semibold">42.5 hrs</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Utilization</span>
              <span className="font-semibold text-green-600">92%</span>
            </div>
            <div className="mt-4">
              <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                View Analytics →
              </button>
            </div>
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="Production Progress" icon={<TrendingUp className="text-indigo-600" />}>
        <ProductionProgress />
      </DashboardCard>
    </div>
  );
};

export default Dashboard;