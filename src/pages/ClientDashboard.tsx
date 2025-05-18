import React from 'react';
import { Package, TrendingUp, Clock, FileText } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import { useTranslation } from 'react-i18next';

const ClientDashboard: React.FC = () => {
  const { t } = useTranslation();

  // Mock data for client orders
  const orders = [
    {
      id: 'WO-1234',
      product: 'Motor Housing A-12',
      quantity: 500,
      status: 'in_progress',
      progress: 68,
      dueDate: '2025-06-15'
    },
    {
      id: 'WO-1235',
      product: 'Gear Assembly B-45',
      quantity: 200,
      status: 'pending',
      progress: 0,
      dueDate: '2025-06-20'
    }
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t('client.dashboard')}</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          New Order Request
        </button>
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Completed Orders</h3>
          <p className="text-2xl font-bold text-gray-800">12</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
          <p className="text-2xl font-bold text-gray-800">3</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-amber-500">
          <h3 className="text-sm font-medium text-gray-500">Pending Approval</h3>
          <p className="text-2xl font-bold text-gray-800">2</p>
        </div>
      </div>

      {/* Active Orders */}
      <DashboardCard 
        title={t('client.activeOrders')} 
        icon={<Package className="text-indigo-600" />}
        className="mb-6"
      >
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">{order.product}</h3>
                  <p className="text-sm text-gray-500">{order.id}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-500">Due: {order.dueDate}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-500 block">Quantity</span>
                  <span className="font-medium">{order.quantity} units</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 block">Status</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    In Progress
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{order.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${order.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>

      {/* Order History */}
      <DashboardCard 
        title={t('client.orderHistory')} 
        icon={<FileText className="text-indigo-600" />}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Recent Orders</h4>
            <button className="text-indigo-600 text-sm hover:text-indigo-800">
              View All →
            </button>
          </div>
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-2">Order ID</th>
                <th className="pb-2">Product</th>
                <th className="pb-2">Date</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                <td className="py-2">WO-1230</td>
                <td className="py-2">Brake Components</td>
                <td className="py-2">May 15, 2025</td>
                <td className="py-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Completed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2">WO-1229</td>
                <td className="py-2">Hydraulic Pump</td>
                <td className="py-2">May 12, 2025</td>
                <td className="py-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
};

export default ClientDashboard;